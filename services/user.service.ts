import { RegisterRequest, ValidatedRequest } from "../lib/types";
import UserModel from "../models/DB/user.model";

class UserService {

    public async createUser(user:ValidatedRequest<RegisterRequest>){
        return await UserModel.create(user.body)
    }

    public async emailExists(email:string){
        return await UserModel.findOne({email}).lean().exec()
    }

    public async findById(id:string) {
        return await UserModel.findById(id)
    }

    public async findByIdAndUpdate(id:string, data:object) {
        return await UserModel.findByIdAndUpdate(id,data)
    }

    public async findWithoutPassword (id:string){
        return await UserModel.findById(id).select("-password")
    }

}

export default UserService