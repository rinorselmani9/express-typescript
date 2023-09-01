import {Request, Response, Router} from 'express';
import UserController from '../controllers/user.controller';
import BaseResponse from '../utils/BaseResponse';

const router = Router();
//TODO: routes for login, change-password, handle types for requests

router.post('/register', async(req:Request, res:Response) => {
  BaseResponse(res).success(await UserController.registerUser(req.body))
})

export default router
