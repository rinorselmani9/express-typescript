import { JwtPayload, Secret, SignOptions } from "jsonwebtoken"
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation"
export { ValidatedRequest } from "express-joi-validation"

export type ErrorResponse = {
  error: boolean
  name: string
  message: string
  statusCode: number
  details: object
}

export interface User {
  _id: string
  email: string
  first_name: string
  last_name: string
  password: string
  createdAt: string
  updatedAt: string
}

export interface Artist {
    _id: string
    full_name:string
    nickname:string
    createdAt: string
    updatedAt: string
}

export interface JwtSign {
  payload: string | Buffer | object
  secretKey: Secret
  options?: SignOptions | undefined
}

export interface ResetPasswordPayload extends JwtPayload {
  user_id: string
}

//Requests

export interface RegisterRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
    first_name: string
    last_name: string
    password: string
  }
}
export interface LoginRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
    password: string
  }
}
export interface ForgotPasswordRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string
  }
}

export interface ResetPasswordRequest extends ValidatedRequestSchema{
  [ContainerTypes.Body]: {
    token: string
    new_password: string
  }
}

export interface GetMeRequest extends ValidatedRequestSchema {
  access_token:string
}
