import {model, Schema} from 'mongoose'
import {Artist as ArtistT} from '../../lib/types'

const schema = new Schema (
    {
        full_name: { type:String, required:true },
        nickname: { type:String, required:true },
        songs: [{type:String, required:true}],
        coverPhoto:{type:String}
    },
    { timestamps: true }
)

const Artist = model<ArtistT>('artists', schema)

export default Artist