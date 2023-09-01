import {Request, Response, Router} from 'express';
const router = Router();
import UserModel from '../models/DB/user.model';
import { User } from '../lib/types';
import UserController from '../controllers/user.controller';
import BaseResponse from '../utils/BaseResponse';

//TODO: routes for login, change-password, handle types for requests

router.post('/register', async(req:Request, res:Response) => {
  const result = await UserController.registerUser(req.body)
  BaseResponse(res).success(result)
})

export default router
