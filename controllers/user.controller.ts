import { AuthLoginError, EmailExistsError, EmailNotFoundError } from "../utils/exceptions/Exceptions";
import Bcrypt from "../lib/Bcrypt";
import Jwt from "../lib/Jwt";
import { ForgotPasswordRequest, GetMeRequest, LoginRequest, RegisterRequest, ResetPasswordPayload, ResetPasswordRequest, ValidatedRequest } from "../lib/types";
import UserService from "../services/user.service";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    public async registerUser(params: ValidatedRequest<RegisterRequest>){
        if(await this.userService.emailExists(params.body.email)){
            throw new EmailExistsError()
        }

        params.body.password = await Bcrypt.hash(params.body.password)


        const user = await this.userService.createUser(params)
        return user._id
    }

    public async login(params: ValidatedRequest<LoginRequest>){
        const user = await this.userService.emailExists(params.body.email)

        if(!user){
            throw new AuthLoginError()
        }

        if(!await Bcrypt.compare(params.body.password, user.password)){
            throw new AuthLoginError()
        }

        const token = Jwt.sign({
            payload : { user_id:user._id},
            secretKey: process.env.SECRET_KEY as string,
            options: {expiresIn: "2d"}
        })

        return token
    }

    public async forgotPassword(params:ValidatedRequest<ForgotPasswordRequest>) {

        const user = await this.userService.emailExists(params.body.email)
        if(!user) {
            throw new EmailNotFoundError()
        }

        const token = Jwt.sign({
            payload : { user_id:user._id},
            secretKey: process.env.SECRET_KEY as string,
            options: {expiresIn: "5m"}
        })


        return token
    }

    public async resetPassword(params:ValidatedRequest<ResetPasswordRequest>){

        const decoded = Jwt.verify(
            params.body.token,
            process.env.SECRET_KEY as string
        ) as ResetPasswordPayload

        const user = await this.userService.findById(decoded.user_id);

        if(!user){
            throw new EmailNotFoundError()
        }

        const newPassword = await Bcrypt.hash(params.body.new_password)
        await this.userService.findByIdAndUpdate(user._id, {
            password:newPassword
        })
        return true
    }
    public async me(params:string){
        const decoded = Jwt.verify(
            params,
            process.env.SECRET_KEY as string
        ) as ResetPasswordPayload
        
        const user = await this.userService.findWithoutPassword(decoded.user_id)
            
        if(!user){
            throw new EmailNotFoundError()
        }
        
        return user
    }
}

export default new UserController()