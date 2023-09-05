import { User } from "../lib/types";
import UserModel from "../models/DB/user.model";

class UserService {

    public async createUser(user:User){
        return await UserModel.create(user)
    }

    public async emailExists(email:string){
        return await UserModel.findOne({email}).lean().exec()
    }

    public async findById(id:string) {
        return await UserModel.findById(id)
    }

    public async findByIdAndUpdate(id:string, data:object) {
        return await UserModel.findByIdAndUpdate(id,{})
    }

}

export default UserService