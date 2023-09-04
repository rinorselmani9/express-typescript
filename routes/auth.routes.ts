import {Request, Response, Router} from 'express';
import UserController from '../controllers/user.controller';
import BaseResponse from '../utils/BaseResponse';
import { ForgotPasswordRequest, LoginRequest } from '../lib/types';

const router = Router();
//TODO: routes for login, change-password, handle types for requests

router.post('/login', async(req:Request<LoginRequest>, res:Response) => {
  BaseResponse(res).success(await UserController.login(req.body));
})

router.post('/register', async(req:Request, res:Response) => {
  BaseResponse(res).success(await UserController.registerUser(req.body))
})

router.post('/forgot-password', async(req:Request<ForgotPasswordRequest>, res:Response) => {
  BaseResponse(res).success(await UserController.forgotPassword(req.body))
})

export default router
