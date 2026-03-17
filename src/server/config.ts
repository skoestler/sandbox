import {randomUUID} from 'crypto';

export const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const natsUrl = process.env.NATS_URL ?? 'nats://localhost:4222';
export const etcdHosts = process.env.ETCD_HOSTS ?? '127.0.0.1:2379';

const idPrefix = process.env.NODE_ID_PREFIX ?? 'node-';
export const nodeID = `${idPrefix}${randomUUID()}`;