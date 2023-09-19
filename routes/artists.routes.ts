import { Request, Response, Router } from "express"
import AuthMiddleware from "../middlewares/auth.middleware"
import BaseResponse from "../utils/BaseResponse"
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations"
import { ValidatedRequest } from "express-joi-validation"
import {
  AddArtistRequest,
  AddToFavRequest,
  DeleteArtistRequest,
  RemoveFromFavRequest,
  UpdateArtistRequest,
} from "../lib/types"
import ArtistController from "../controllers/artist.controller"

const router = Router()

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
    BaseResponse(res).success(await ArtistController.getMyArtists(req))
  }
)

router.post(
  "/update",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.updateArtist()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: ValidatedRequest<UpdateArtistRequest>, res: Response) => {
    BaseResponse(res).success(await ArtistController.updateArtist(req))
  }
)

router.post(
  "/delete",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.deleteArtist()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: ValidatedRequest<DeleteArtistRequest>, res: Response) => {
    BaseResponse(res).success(await ArtistController.deleteArtist(req))
  }
)

router.post(
  "/add-favorite",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.addToFav()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: ValidatedRequest<AddToFavRequest>, res: Response) => {
    BaseResponse(res).success(await ArtistController.addToFav(req))
  }
)

router.post(
  "/remove-favorite",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  RouteValidator.body(RouteValidatorSchema.removeFromFav()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: ValidatedRequest<RemoveFromFavRequest>, res: Response) => {
    BaseResponse(res).success(await ArtistController.removeFromFav(req))
  }
)

router.get(
  "/favorites",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  AuthMiddleware.validateAccessToken,
  AuthMiddleware.validateTokenExpiration,
  async (req: Request, res: Response) => {
    BaseResponse(res).success(await ArtistController.getMyFavArtists(req))
  }
)

export default router
