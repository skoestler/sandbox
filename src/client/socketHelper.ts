import {io, Socket} from "socket.io-client";
import {SayHello} from '../common/actions';

const socket: Socket = io("/");

const makeCall: <P, R>(a: string) => (p: P) => Promise<R> =
    (action) => (payload) => new Promise((resolve, reject) => {
        socket.emit('call', action, payload, function (err: any, res: any) {
            if (err) reject(err);
            else resolve(res);
        });
    });

export const greeter = {
    sayHello: makeCall<SayHello, string>('greeter.sayHello')
};