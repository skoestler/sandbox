import {Etcd3} from "etcd3";
import {Context} from "moleculer";
import {etcdHosts} from "./config.ts";
import {ClusterGet, ClusterSet} from "../common/actions.ts";

const client = new Etcd3({hosts: etcdHosts});

export const ClusterService = {
    name: "cluster",
    actions: {
        get: {
            params: ClusterGet,
            async handler(ctx: Context<ClusterGet>) {
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
