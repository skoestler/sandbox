const {Validators} = require('moleculer');
const Ajv = require('ajv');

class AjvValidator extends Validators.Base {
    ajv: any;

    constructor() {
        super();
        this.ajv = new Ajv({allErrors: true, coerceTypes: true, strict: false});
    }

    compile(schema: object) {
        const validate = this.ajv.compile(schema);
        return (params: unknown) => {
            if (validate(params)) return true;
            return validate.errors!.map((err: any) => ({
                type: "ajv",
                field: err.instancePath.replace(/^\//, ''),
                message: err.message,
            }));
        };
    }
}

module.exports = AjvValidator;
