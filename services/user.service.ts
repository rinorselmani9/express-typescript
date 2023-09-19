import { userSessionSchema } from "../entities/UserSession"
import { RegisterRequest, ValidatedRequest } from "../lib/types"
import UserModel from "../models/DB/user.model"
import RedisService from "./redis.service"
import crypto from "crypto"
class UserService {
  private redisService: RedisService

  constructor() {
    this.redisService = new RedisService()
  }

  public async createUser(user: ValidatedRequest<RegisterRequest>) {
    return await UserModel.create(user.body)
  }

  public async emailExists(email: string) {
    return await UserModel.findOne({ email }).lean().exec()
  }

  public async findById(id: string) {
    return await UserModel.findById(id)
  }

  public async findByIdAndUpdate(id: string, data: object) {
    return await UserModel.findByIdAndUpdate(id, data)
  }

  public async findWithoutPassword(id: string) {
    return await UserModel.findById(id).select("-password");
  }

  public generateAccessTokenExp() {
    const currentTime = new Date().getTime()
    const fiveMinutesExp = new Date(currentTime + 5 * 60 * 1000).getTime()
    return fiveMinutesExp
  }

  public generateRefreshTokenExp() {
    const currentTime = new Date().getTime()
    const twoDaysExp = new Date(currentTime + 2 * 24 * 60 * 60 * 1000).getTime()
    return twoDaysExp
  }

  public tokenExpired(exp: number) {
    return new Date().getTime() >= exp;
  }

  public async saveSession(userId: string) {
    const repository = await this.redisService.fetchRepo(userSessionSchema)
    return await repository.save({
      user_id: userId,
      access_token: crypto.randomBytes(30).toString("hex"),
      refresh_token: crypto.randomBytes(30).toString("hex"),
      access_token_exp: this.generateAccessTokenExp(),
      refresh_token_exp: this.generateRefreshTokenExp(),
    })
  }

  public async findSession(access_token:string){
    const repo = await this.redisService.fetchRepo(userSessionSchema)
    return await repo.search().where('access_token').equalTo(access_token).first()
  }

  public async populateArtists(userId:string){
    return await UserModel.findOne({_id:userId}).populate('favoriteArtists').exec()
  }

}

export default UserService
