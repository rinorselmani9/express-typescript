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

router.post(
  "/login",
  RouteValidator.body(RouteValidatorSchema.loginUser()),
  async (req: ValidatedRequest<LoginRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.login(req))
  }
)

router.post(
  "/register",
  RouteValidator.body(RouteValidatorSchema.registerUser()),
  async (req: ValidatedRequest<RegisterRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.registerUser(req))
  }
)

router.post(
  "/forgot-password",
  RouteValidator.body(RouteValidatorSchema.forgotPassword()),
  async (req: ValidatedRequest<ForgotPasswordRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.forgotPassword(req))
  }
)

export default router
