import { config } from "dotenv";
import { AuthLoginError, EmailExistsError } from "../exceptions/Exceptions";
import Bcrypt from "../lib/Bcrypt";
import Jwt from "../lib/Jwt";
import { ForgotPasswordRequest, LoginRequest, ResetPasswordPayload, ResetPasswordRequest, User } from "../lib/types";
import UserService from "../services/user.service";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    public async registerUser(params: User){
        if(await this.userService.emailExists(params.email)){
            throw new EmailExistsError()
        }

        params.password = await Bcrypt.hash(params.password)


        const user = await this.userService.createUser(params)
        return user._id
    }

    public async login(params: LoginRequest){
        const user = await this.userService.emailExists(params.email)

        if(!user){
            throw new AuthLoginError()
        }

        if(!await Bcrypt.compare(params.password, user.password)){
            throw new AuthLoginError()
        }

        const token = Jwt.sign({
            payload : { user_id:user._id},
            secretKey: process.env.SECRET_KEY as string,
            options: {expiresIn: "2d"}
        })

        return token
    }

    public async forgotPassword(params:ForgotPasswordRequest) {

        const user = await this.userService.emailExists(params.email)
        if(!user) {
            throw new EmailExistsError()
        }

        const token = Jwt.sign({
            payload : { user_id:user._id},
            secretKey: process.env.SECRET_KEY as string,
            options: {expiresIn: "5m"}
        })


        return token
    }

    public async resetPassword(params:ResetPasswordRequest){

        const decoded = Jwt.verify(
            params.token,
            process.env.SECRET_KEY as string
        ) as ResetPasswordPayload

        const user = await this.userService.findById(decoded.user_id);

        if(!user){
            throw new EmailExistsError()
        }

        const newPassword = await Bcrypt.hash(params.new_password)
        await this.userService.findByIdAndUpdate(user._id, {
            password:newPassword
        })
        return true
    }
}

export default new UserController()