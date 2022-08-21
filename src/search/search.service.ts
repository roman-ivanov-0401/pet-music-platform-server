import { AlbumService } from "../album/album.service";
import { ArtistService } from "../artist/artist.service";
import { EpService } from "../ep/ep.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PlaylistService } from "../playlist/playlist.service";
import { SingleService } from "../single/single.service";

@Injectable()
export class SearchService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly epService: EpService,
    private readonly singleService: SingleService,
    private readonly playlistService: PlaylistService
  ) {}
  async search(searchTerm: string) {
    try {
      const artists = await this.artistService.getBySearchTerm(searchTerm);
      const albums = await this.albumService.getBySearchTerm(searchTerm);
      const eps = await this.epService.getBySearchTerm(searchTerm);
      const singles = await this.singleService.getBySearchTerm(searchTerm);
      const playlists = await this.playlistService.getBySearchTerm(searchTerm);
      return {
        artists,
        albums,
        eps,
        singles,
        playlists,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
