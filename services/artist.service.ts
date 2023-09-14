import { Artist } from "../lib/types";
import ArtistModel from "../models/DB/artist.model";

class ArtistService{

    public async nickNameExists(nickname:string) {
        return await ArtistModel.findOne({nickname}).lean().exec()
    }

    public async createArtist(params: Artist){
        return await ArtistModel.create(params)
    }

    public async getAllArtists(){
        return await ArtistModel.find();
    }
    public async myArtists(userId:string){
        return await ArtistModel.find({addedBy:userId});
    }
}
export default ArtistService