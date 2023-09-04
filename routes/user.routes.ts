import {Request, Response, Router } from 'express'
import BaseResponse from '../utils/BaseResponse'
import { ResetPasswordRequest } from '../lib/types'
import UserController from '../controllers/user.controller'

const router = Router()


router.post('/reset-password', async(req:Request<ResetPasswordRequest>, res:Response) => {
    BaseResponse(res).success(await UserController.resetPassword(req.body))
})

export default router