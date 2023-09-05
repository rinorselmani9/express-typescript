import { Request, Response, Router } from "express"
import BaseResponse from "../utils/BaseResponse"
import { ResetPasswordRequest, ValidatedRequest } from "../lib/types"
import UserController from "../controllers/user.controller"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"

const router = Router()

router.post(
  "/reset-password",
  RouteValidator.body(RouteValidatorSchema.resetPassword()),
  async (req: ValidatedRequest<ResetPasswordRequest>, res: Response) => {
    BaseResponse(res).success(await UserController.resetPassword(req))
  }
)

export default router
