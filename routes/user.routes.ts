import { Request, Response, Router } from "express"
import BaseResponse from "../utils/BaseResponse"
import { GetMeRequest, ResetPasswordRequest, ValidatedRequest } from "../lib/types"
import UserController from "../controllers/user.controller"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"

const router = Router()

// TODO: routes for: me(profile), update-profile, add artists(should directly add it to personal favorites), delete, favorite

router.post(
  "/reset-password",
  RouteValidator.body(RouteValidatorSchema.resetPassword()),
  async (req: ValidatedRequest<ResetPasswordRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.resetPassword(req))
  }
)

router.post('/me',
RouteValidator.headers(RouteValidatorSchema.currentUser()),
async (req: ValidatedRequest<GetMeRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.me(req.headers.access_token))
  }
)

export default router
