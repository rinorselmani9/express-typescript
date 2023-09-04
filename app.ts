import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import BaseResponse from "./utils/BaseResponse";
import indexRouter from './routes/index'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import { connectToDB } from "./config/db.config";

dotenv.config()
const app: Express = express();
connectToDB()

app.use(express.json());

// app.use('/', indexRouter);
app.use('/', authRoutes);
app.use('/user',userRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) =>  {
  BaseResponse(res).error(error)
});

app.use((req: Request, res: Response) => {
  BaseResponse(res).routeNotFound()
});

export default app
