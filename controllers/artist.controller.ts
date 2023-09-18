import { ValidatedRequest } from "express-joi-validation"
import ArtistService from "../services/artist.service"
import { AddArtistRequest, AddToFavRequest, DeleteArtistRequest, UpdateArtistRequest } from "../lib/types"
import { AlreadyAFavError, ArtistExistsError, DeleteArtistError, MyArtistsError, NoArtistsError, UpdateArtistError } from "../utils/exceptions/Exceptions"
import { Request } from "express"
import UserService from "../services/user.service"

class ArtistController {
  private artistService: ArtistService
  private userService: UserService

  constructor() {
    this.artistService = new ArtistService()
    this.userService = new UserService()
  }

  public async addArtist(params: ValidatedRequest<AddArtistRequest>) {
    params.body.addedBy = params.session.user_id

    if (await this.artistService.nickNameExists(params.body.nickname)) {
      throw new ArtistExistsError()
    }
    return await this.artistService.createArtist(params.body)
  }

  public async getAllArtist() {
    const artists = await this.artistService.getAllArtists()
    if (!artists) {
      throw new NoArtistsError()
    }
    return artists
  }

  public async getMyArtists(params: Request) {
    const myArtists = await this.artistService.myArtists(params.session.access_token)
    if (!myArtists) {
      throw new MyArtistsError()
    }
    return myArtists
  }

  public async updateArtist(params: ValidatedRequest<UpdateArtistRequest>){
    const userId = params.session.user_id;
    const artistId = params.body._id

    const artist = await this.artistService.findById(artistId)
    if(artist?.addedBy.toString() !== userId){
        throw new UpdateArtistError()
    }

    return await this.artistService.findByIdAndUpdate(artistId, params.body);
  }
  
  public async deleteArtist(params:ValidatedRequest<DeleteArtistRequest>){
    const userId = params.session.user_id;
    const artistId = params.body._id

    const artist = await this.artistService.findById(artistId)
    if(artist?.addedBy.toString() !== userId){
        throw new DeleteArtistError()
    }
    
    return await this.artistService.findByIdAndRemove(artistId)
  }

  public async addToFav(params: ValidatedRequest<AddToFavRequest>){
    const user = await this.userService.findWithoutPassword(params.session.user_id) 
    const artistsExists = user?.favoriteArtists.find((elem) => elem === params.body.artist_id);

    if(artistsExists){
      throw new AlreadyAFavError()
    }
    user?.favoriteArtists.push(params.body.artist_id)
    user?.save()
    return true
  }
}

export default new ArtistController()
