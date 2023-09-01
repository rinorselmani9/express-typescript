import { AuthLoginError, EmailExistsError } from "../exceptions/Exceptions";
import Bcrypt from "../lib/Bcrypt";
import { LoginRequest, User } from "../lib/types";
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
    //TODO: create tokens when logging in 
    public async login(params: LoginRequest){
        const user = await this.userService.emailExists(params.email)

        if(!user){
            throw new AuthLoginError()
        }

        if(!await Bcrypt.compare(params.password, user.password)){
            throw new AuthLoginError()
        }

        return user._id
    }
}

export default new UserController()