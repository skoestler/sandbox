import {Etcd3, Watcher} from "etcd3";
import {Context} from "moleculer";
import type {ServiceSchema} from "moleculer"
import {etcdHosts} from "./config.ts";
import {ClusterGet, ClusterSet} from "../common/actions.ts";

const client = new Etcd3({hosts: etcdHosts});

export const ClusterService: ServiceSchema = {
    name: "cluster",
    created() {
        this.watchers = new Map();
    },
    events: {
        'socket.disconnected'(ctx: { params: { socketId: string } }) {
            this.watchers
                .get(ctx.params.socketId)
                .forEach((watcher: Watcher) => watcher.cancel())
            this.watchers.set(ctx.params.socketId, [])
        }
    },
    actions: {
        get: {
            params: ClusterGet,
            async handler(ctx: Context<ClusterGet, { $socketId: string }>) {
                const {key} = ctx.params;
                const socketId = ctx.meta.$socketId;
                // initialize the watcher array if necessary
                if (!this.watchers.get(socketId)) {
                    this.watchers.set(socketId, []);
                }
                // create the watcher and add it ot the array
                const watcher: Watcher = await client.watch().key(key).create();
                this.watchers.get(socketId).push(watcher);
                // when the watcher fires, broadcast a message to the socket
                // subscribed to it.
                watcher.on('put', (kv: any) => {
                    this.broker.call('gateway.broadcast', {
                        namespace: '/',
                        rooms: [socketId],
                        event: 'etcd.change',
                        args: [{key, value: kv.value.toString()}]
                    })
                });
                // return the current value as a reply to the call as well
                return await client.get(ctx.params.key).string();
            }
        },
        set: {
            params: ClusterSet,
            async handler(ctx: Context<ClusterSet>) {
                await client.put(ctx.params.key).value(ctx.params.value);
            }
        }
    }
}
