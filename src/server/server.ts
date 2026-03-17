import {ServiceBroker} from 'moleculer';
import AjvValidator from '../common/ajv-validator.ts';
import {port, natsUrl, nodeID} from './config.ts';
import {ClusterService} from "./cluster.ts";
import {GatewayService} from "./gateway.ts";

const broker = new ServiceBroker({
    nodeID,
    transporter: natsUrl,
    validator: new AjvValidator(),
});

broker.createService(GatewayService(port));
broker.createService(ClusterService);

broker.start();