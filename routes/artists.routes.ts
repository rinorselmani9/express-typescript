import { Request, Response, Router } from "express"
import AuthMiddleware from "../middlewares/auth.middleware"
import BaseResponse from "../utils/BaseResponse"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"
import { ValidatedRequest } from "express-joi-validation"
import { AddArtistRequest } from "../lib/types"
import ArtistController from "../controllers/artist.controller"

const router = Router()
// TODO: routes: [get my artists, get my fav, edit artist, delete artist, add to fav, remove from fav ]

router.post(
  "/add",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.addArtist()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: ValidatedRequest<AddArtistRequest>, res: Response) => {
    BaseResponse(res).success(await ArtistController.addArtist(req))
  }
)

router.get("/", async (req: Request, res: Response) => {
  BaseResponse(res).success(await ArtistController.getAllArtist())
})

router.get(
  "/mine",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: Request, res: Response) => {
    BaseResponse(res).success(await ArtistController.getMyArtists(req));
  }
)

export default router
