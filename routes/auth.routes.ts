import { Request, Response, Router } from "express"
import UserController from "../controllers/user.controller"
import BaseResponse from "../utils/BaseResponse"
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ValidatedRequest,
} from "../lib/types"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"

const router = Router()
//TODO: routes for login, change-password, handle types for requests

router.post("/login", async (req: Request<LoginRequest>, res: Response) => {
  BaseResponse(res).success(await UserController.login(req.body))
})

router.post(
  "/register",
  RouteValidator.body(RouteValidatorSchema.registerUser()),
  async (req: ValidatedRequest<RegisterRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.registerUser(req))
  }
)

router.post("/forgot-password", async (req: Request<ForgotPasswordRequest>, res: Response) => {
  BaseResponse(res).success(await UserController.forgotPassword(req.body))
})

export default router
