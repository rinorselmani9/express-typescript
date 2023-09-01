import { ErrorResponse } from "../lib/types";

export class BaseError extends Error implements ErrorResponse{
    public error: boolean = true;
    public name: string = 'api-error';
    public message: string = "Server Error";
    public statusCode: number = 400;
    public details: object = {};

    constructor() {
        super();
    }
}

export class InternalServerError extends BaseError {
    name = 'internal-server-error'
    statusCode = 400

    constructor(){
        super()
    }
}

export class RouteNotFoundError extends BaseError {
    name = 'route-not-found-error';
    message = 'This route could not be found'
    statusCode = 400
    constructor() {
        super()
    }
}

export class EmailExistsError extends BaseError {
    name = 'this-email-already-exists'
    message = 'This email already exists'
    statusCode = 400
    constructor (){
       super()
    }
}