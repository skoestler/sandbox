import {ServiceBroker} from 'moleculer';
import {natsUrl, nodeID} from './config.ts';

const broker = new ServiceBroker({
    nodeID: `${nodeID}`,
    transporter: natsUrl,
});

broker.start().then(() => broker.repl());