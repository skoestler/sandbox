import {Socket} from "socket.io-client";
import {SayHello} from '../common/actions';
import {FromSchema} from "json-schema-to-ts";

export function sayHello(socket: Socket, payload: FromSchema<typeof SayHello>): Promise<string> {
    return new Promise((resolve, reject) => {
        socket.emit('call', 'greeter.sayHello', payload,
            function (err: any, res: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
}
