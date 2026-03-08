import type {Context} from 'moleculer';
import type {FromSchema} from "json-schema-to-ts";

const {ServiceBroker} = require('moleculer');
const HTTPServer = require('moleculer-web');
const AjvValidator = require('./ajv-validator.ts');

const broker = new ServiceBroker({
    nodeID: "node-1",
    transporter: "NATS",
    validator: new AjvValidator(),
});

broker.createService({
    name: "gateway",
    mixins: [HTTPServer],
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

const payload = {
    type: 'object',
    properties: {
        name: {type: 'string', minLength: 1}
    },
    additionalProperties: false
} as const;

broker.createService({
    name: 'greeter',
    actions: {
        sayHello: {
            params: payload,
            handler(ctx: Context<FromSchema<typeof payload>>) {
                return `Hello, ${ctx.params.name}!`;
            }
        }
    }
});

broker.start();