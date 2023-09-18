import { JwtPayload, Secret, SignOptions } from "jsonwebtoken"
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation"
export { ValidatedRequest } from "express-joi-validation"

declare global {
  namespace Express {
    export interface Request {
      user: User;
      session: UserSession;
    }
  }
}

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
  favoriteArtists: string[]
  createdAt: string
  updatedAt: string
}

export interface Artist {
    _id: string
    full_name:string
    nickname:string
    addedBy:string
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

export interface UserSession {
  entityId: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  access_token_exp: number;
  refresh_token_exp: number;
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

export interface UpdateProfileRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    first_name:string,
    last_name:string
  }
}

export interface AddArtistRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Artist
}

export interface UpdateArtistRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Artist
}

export interface DeleteArtistRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Artist
  
}

export interface AddToFavRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    artist_id:string
  }
  
}

export interface RemoveFromFavRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    artist_id:string
  }
  
}