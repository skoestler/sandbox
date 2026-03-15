import {Socket} from "socket.io-client";
import {SayHello} from '../common/actions';

const makeCall: <P, R>(a: string) => (s: Socket, p: P) => Promise<R> =
    (action) => (socket, payload) => new Promise((resolve, reject) => {
        socket.emit('call', action, payload, function (err: any, res: any) {
            if (err) reject(err);
            else resolve(res);
        });
    });

export const greeter = {
    sayHello: makeCall<SayHello, string>('greeter.sayHello')
};