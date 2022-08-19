import { Auth } from "../auth/auth.decorator";
import { Controller, HttpCode, HttpStatus, Patch, Query } from "@nestjs/common";
import { User } from "./decorators";
import { Role, UserModel } from "./user.model";
import { Ref } from "@typegoose/typegoose";
import { AlbumModel } from "../album/album.model";
import { Types } from "mongoose";
import { LibraryService } from "../library/library.service";
import { EpModel } from "../ep/ep.model";
import { SingleModel } from "../single/single.model";
import { PlaylistModel } from "../playlist/playlist.model";
import { TrackModel } from "../track/track.model";
import { ArtistModel } from "../artist/artist.model";

@Controller("users")
export class UserController {
  constructor(private readonly libraryService: LibraryService) {}

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addAlbum")
  addAlbum(
    @User() user: Omit<UserModel, "password">,
    @Query("albumId") albumId: Ref<AlbumModel, Types.ObjectId>
  ) {
    return this.libraryService.addAlbum(user.library, albumId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removeAlbum")
  removeAlbum(
    @User() user: Omit<UserModel, "password">,
    @Query("albumId") albumId: Ref<AlbumModel, Types.ObjectId>
  ) {
    return this.libraryService.removeAlbum(user.library, albumId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addEp")
  addEp(
    @User() user: Omit<UserModel, "password">,
    @Query("epId") epId: Ref<EpModel, Types.ObjectId>
  ) {
    return this.libraryService.addEp(user.library, epId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removeEp")
  removeEp(
    @User() user: Omit<UserModel, "password">,
    @Query("epId") epId: Ref<EpModel, Types.ObjectId>
  ) {
    return this.libraryService.removeEp(user.library, epId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addSingle")
  addSingle(
    @User() user: Omit<UserModel, "password">,
    @Query("singleId") singleId: Ref<SingleModel, Types.ObjectId>
  ) {
    return this.libraryService.addSingle(user.library, singleId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removeSingle")
  removeSingle(
    @User() user: Omit<UserModel, "password">,
    @Query("singleId") singleId: Ref<SingleModel, Types.ObjectId>
  ) {
    return this.libraryService.removeSingle(user.library, singleId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addPlaylist")
  addPlaylist(
    @User() user: Omit<UserModel, "password">,
    @Query("playlistId") playlistId: Ref<PlaylistModel, Types.ObjectId>
  ) {
    return this.libraryService.addPlaylist(user.library, playlistId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removePlaylist")
  removePlaylist(
    @User() user: Omit<UserModel, "password">,
    @Query("playlistId") playlistId: Ref<PlaylistModel, Types.ObjectId>
  ) {
    return this.libraryService.removePlaylist(user.library, playlistId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addFavorite")
  addFavorite(
    @User() user: Omit<UserModel, "password">,
    @Query("trackId") trackId: Ref<TrackModel, Types.ObjectId>
  ) {
    return this.libraryService.addFavorite(user.library, trackId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removeFavorite")
  removeFavorite(
    @User() user: Omit<UserModel, "password">,
    @Query("trackId") trackId: Ref<TrackModel, Types.ObjectId>
  ) {
    return this.libraryService.removeFavorite(user.library, trackId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("addFollow")
  addFollow(
    @User() user: Omit<UserModel, "password">,
    @Query("artistId") artistId: Ref<ArtistModel, Types.ObjectId>
  ) {
    return this.libraryService.addFollow(user.library, artistId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.user)
  @Patch("removeFollow")
  removeFollow(
    @User() user: Omit<UserModel, "password">,
    @Query("artistId") artistId: Ref<ArtistModel, Types.ObjectId>
  ) {
    return this.libraryService.removeFollow(user.library, artistId);
  }
}
