import { NextFunction, Request, Response } from "express"
import UserService from "../services/user.service"
import { UserSession } from "../lib/types"
import { InvalidAccessToken } from "../utils/exceptions/Exceptions"

class AuthMiddleware {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {

    const access_token = req.headers.access_token as string
    const session = await this.userService.findSession(access_token)

    if(!session){
        throw new InvalidAccessToken()
    }
    const userSession = { ...session , entityId: session.entityId } as UserSession
    req.session = userSession
    next();
  }

  public populateUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.findById(request.session.user_id);
    if (!user) {
      throw new InvalidAccessToken();
    }
    request.user = user;
    next();
  };
}

export default new AuthMiddleware()