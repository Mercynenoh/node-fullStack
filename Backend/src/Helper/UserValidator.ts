
import Joi from 'joi'

export const UserSchema= Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().min(8).alphanum().required()
})

export const UserSchemas= Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().min(8).alphanum().required()
})
