import { User } from "../lib/types";
import UserModel from "../models/DB/user.model";

class UserService {

    //TODO: create a service which checks if the email already exists
    public async createUser(user:User){
        return await UserModel.create(user)
    }

    public async emailExists(email:string){
        return await UserModel.findOne({email}).lean().exec()
    }

}

export default UserService