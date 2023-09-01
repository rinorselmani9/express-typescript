import { EmailExistsError } from "../exceptions/Exceptions";
import Bcrypt from "../lib/Bcrypt";
import { User } from "../lib/types";
import UserService from "../services/user.service";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    public async registerUser(params: User){
        if( await this.userService.emailExists(params.email)){
            throw new EmailExistsError()
        }

        params.password = await Bcrypt.hash(params.password)


        const user = await this.userService.createUser(params)
        return user._id
    }
}

export default new UserController()