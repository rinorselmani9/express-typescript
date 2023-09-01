import {Request, Response, Router} from 'express';
import UserController from '../controllers/user.controller';
import BaseResponse from '../utils/BaseResponse';
import { LoginRequest } from '../lib/types';

const router = Router();
//TODO: routes for login, change-password, handle types for requests

router.post('/login', async(req:Request<LoginRequest>, res:Response) => {
  BaseResponse(res).success(await UserController.login(req.body));
})



router.post('/register', async(req:Request, res:Response) => {
  BaseResponse(res).success(await UserController.registerUser(req.body))
})

export default router
