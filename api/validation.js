//validation for email,password etc.
const Joi = require("joi")

//Register validation schema
const registerValidation=(data) =>{

    const schema = Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(data)
}
//login validation
const loginValidation=(data) =>{

    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(data)
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;