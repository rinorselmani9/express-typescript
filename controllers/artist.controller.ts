import { ValidatedRequest } from "express-joi-validation"
import ArtistService from "../services/artist.service"
import { AddArtistRequest } from "../lib/types"
import { ArtistExistsError, NoArtistsError } from "../utils/exceptions/Exceptions"

class ArtistController {
    private artistService: ArtistService

    constructor() {
        this.artistService = new ArtistService()
    }

    public async addArtist(params: ValidatedRequest<AddArtistRequest>){
        params.body.addedBy = params.session.user_id

        if(await this.artistService.nickNameExists(params.body.nickname)){
            throw new ArtistExistsError()
        }
        return await this.artistService.createArtist(params.body)
    }
    public async getAllArtist(){
        const artists = await this.artistService.getAllArtists();
        if(!artists){
            throw new NoArtistsError()
        }
        return artists
    }
}

export default new ArtistController()