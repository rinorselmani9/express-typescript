import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export type ErrorResponse = {
    error:boolean;
    name:string;
    message:string;
    statusCode:number;
    details:object;
}

export interface User {
    _id:string;
    email:string;
    first_name:string;
    last_name:string;
    password:string;
    createdAt: string;
    updatedAt: string;
}

export interface JwtSign {
    payload: string | Buffer | object
    secretKey:Secret
    options?: SignOptions | undefined
}

export interface ResetPasswordPayload extends JwtPayload {
    user_id:string
}

//Requests
export interface LoginRequest { 
    email:string
    password:string
}
export interface ForgotPasswordRequest {
    email:string
}

export interface ResetPasswordRequest {
    token:string,
    new_password:string
}