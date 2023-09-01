import { User } from "../lib/types";
import UserService from "../services/user.service";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    // TODO: handle email exists, bcrypt the password 
    public async registerUser(params: User){
        const user = await this.userService.createUser(params)
        return user._id
    }
}

export default new UserController()