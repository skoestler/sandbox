export const SayHello = {
    type: 'object',
    properties: {
        name: {type: 'string', minLength: 1}
    },
    additionalProperties: false
} as const