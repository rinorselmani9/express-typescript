import { Response } from "express";
import { BaseError, InternalServerError, RouteNotFoundError, JoiError } from "./exceptions/Exceptions";
import { ExpressJoiError } from "express-joi-validation";

class BaseResponse {
    private response : Response
    constructor(response:Response){
        this.response = response
    }

    private handleError(err:unknown){
        let errorOccurred
        if(err instanceof BaseError){
            errorOccurred = err
        }else if((err as ExpressJoiError)?.error?.isJoi){
            errorOccurred = new JoiError(err as ExpressJoiError);
        }else{
            errorOccurred = new InternalServerError()
        }

        return this.response.status(errorOccurred?.statusCode).json(errorOccurred)
    }

    public success(body: object | string | number | boolean | null) {
        this.response.status(200).json({
            error:false,
            message:body
        })
    }

    public error(err:unknown) {
        this.handleError(err)
    }

    public routeNotFound() {
        this.handleError(new RouteNotFoundError())
    }
}

export default (response: Response) => new BaseResponse(response)