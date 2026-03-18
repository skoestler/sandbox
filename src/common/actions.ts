import type {FromSchema} from "json-schema-to-ts";

export const ClusterGet = {
    type: 'object',
    properties: {
        key: {type: 'string', minLength: 1},
    },
    required: ['key'],
    additionalProperties: false
} as const

export const ClusterSet = {
    type: 'object',
    properties: {
        key: {type: 'string', minLength: 1},
        value: {type: 'string', minLength: 1}
    },
    required: ['key', 'value'],
    additionalProperties: false
} as const

export type ClusterGet = FromSchema<typeof ClusterGet>;
export type ClusterSet = FromSchema<typeof ClusterSet>;