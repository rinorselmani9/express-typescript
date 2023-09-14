import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import BaseResponse from "./utils/BaseResponse";
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import artistRoutes from './routes/artists.routes'
import { connectToDB } from "./config/db.config";

dotenv.config()
const app: Express = express();
connectToDB()

app.use(express.json());

app.use('/', authRoutes);
app.use('/user',userRoutes)
app.use('/artists', artistRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) =>  {
  BaseResponse(res).error(error)
});

app.use((req: Request, res: Response) => {
  BaseResponse(res).routeNotFound()
});

export default app
