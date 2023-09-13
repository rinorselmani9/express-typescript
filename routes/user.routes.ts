import { Request, Response, Router } from "express"
import BaseResponse from "../utils/BaseResponse"
import { GetMeRequest, ResetPasswordRequest, UpdateProfileRequest, ValidatedRequest } from "../lib/types"
import UserController from "../controllers/user.controller"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"
import AuthMiddleware from "../middlewares/auth.middleware"

const router = Router()


router.post(
  "/reset-password",
  RouteValidator.body(RouteValidatorSchema.resetPassword()),
  async (req: ValidatedRequest<ResetPasswordRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.resetPassword(req))
  }
)

router.post(
  "/me",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  AuthMiddleware.populateUser,
  async (req: ValidatedRequest<GetMeRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.me(req.user))
  }
)

router.post("/re-generate-tokens", async (req: Request, res: Response) => {
  BaseResponse(res).success(await UserController.reGenerateTokens(req))
})

router.post(
  "/update-profile",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.updateProfile()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  AuthMiddleware.populateUser,
  async (req: ValidatedRequest<UpdateProfileRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.updateProfile(req))
  }
)

export default router
