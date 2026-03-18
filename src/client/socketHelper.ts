import {io, Socket} from "socket.io-client";
import {ClusterGet, ClusterSet} from '../common/actions';

export const socket: Socket = io("/");

const makeCall: <P, R>(a: string) => (p: P) => Promise<R> =
    (action) => (payload) => new Promise((resolve, reject) => {
        socket.emit('call', action, payload, function (err: any, res: any) {
            if (err) reject(err);
            else resolve(res);
        });
    });

export const cluster = {
    get: makeCall<ClusterGet, string>('cluster.get'),
    set: makeCall<ClusterSet, void>('cluster.set')
};