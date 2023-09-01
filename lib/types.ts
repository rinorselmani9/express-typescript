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