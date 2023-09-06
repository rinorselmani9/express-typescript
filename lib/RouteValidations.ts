import * as Joi from 'joi'
import {createValidator } from 'express-joi-validation'

export const RouteValidator = createValidator({passError:true})

export class RouteValidatorSchema {
    static registerUser() {
        return Joi.object({
            email:Joi.string().email().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            password: Joi.string().min(6).required()
        })
    }
    static loginUser() {
        return Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(6).required()
        })
    }
    static forgotPassword() {
        return Joi.object({
            email:Joi.string().email().required(),
        })
    }
    static resetPassword() {
        return Joi.object({
            token:Joi.string().required(),
            new_password:Joi.string().min(6).required()
        })
    }

    static currentUser() {
        return Joi.object({
            access_token:Joi.string().required()
        })
    }
}

