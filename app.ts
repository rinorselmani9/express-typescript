import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import BaseResponse from "./utils/BaseResponse";
import indexRouter from './routes/index'
import usersRouter from './routes/users';
import { connectToDB } from "./config/db.config";

dotenv.config()
const app: Express = express();
connectToDB()

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) =>  {
  BaseResponse(res).error(error)
});

app.use((req: Request, res: Response) => {
  BaseResponse(res).routeNotFound()
});

export default app
