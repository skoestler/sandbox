import type {FromSchema} from 'json-schema-to-ts';
import {Context, ServiceBroker} from 'moleculer';
import SocketServer from 'moleculer-io';
import HTTPServer from 'moleculer-web';

import AjvValidator from '../common/ajv-validator.ts';
import {SayHello} from '../common/actions.ts';

const broker = new ServiceBroker({
    nodeID: "node-1",
    transporter: "NATS",
    validator: new AjvValidator(),
});

broker.createService({
    name: "gateway",
    mixins: [HTTPServer, SocketServer as any],
    settings: {
        routes: [
            {
                aliases: {
                    "POST /greet": "greeter.sayHello"
                }
            }
        ]
    }
});

broker.createService({
    name: 'greeter',
    actions: {
        sayHello: {
            params: SayHello,
            handler(ctx: Context<FromSchema<typeof SayHello>>) {
                return `Hello, ${ctx.params.name}!`;
            }
        }
    }
});

broker.start();