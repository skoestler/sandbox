import {FromSchema} from "json-schema-to-ts";

export const SayHello = {
    type: 'object',
    properties: {
        name: {type: 'string', minLength: 1}
    },
    additionalProperties: false
} as const

export type SayHello = FromSchema<typeof SayHello>;