import { model , Schema } from 'mongoose'
import { User as UserT } from '../../lib/types'

const schema = new Schema (
    {
        email: { type:String, required:true, unique:true},
        first_name: { type:String, required:true },
        last_name: { type:String, required:true },
        password: { type:String, required:true },
        favoriteArtists: {type:Schema.Types.ObjectId, ref:'artists'}
    },
    { timestamps: true }
)

const User  = model<UserT>('users', schema)

export default User;