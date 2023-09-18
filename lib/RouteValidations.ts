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

    static updateProfile() {
        return Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required()
        })
    }
    
    static addArtist() {
        return Joi.object({
            full_name: Joi.string().required(),
            nickname: Joi.string().required(),
            songs: Joi.array().required()
        })
    }

    static updateArtist(){
        return Joi.object({
            _id:Joi.string().required(),
            full_name: Joi.string().required(),
            nickname: Joi.string().required(),
            songs: Joi.array().required()
        })
    }

    static deleteArtist(){
        return Joi.object({
            _id:Joi.string().required()
        })
    }

    static addToFav(){
        return Joi.object({
            artist_id:Joi.string().required()
        })
    }

    static removeFromFav(){
        return Joi.object({
            artist_id:Joi.string().required()
        })
    }
}

