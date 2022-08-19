import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { AlbumModel } from "../album/album.model";
import { ArtistModel } from "../artist/artist.model";
import { EpModel } from "../ep/ep.model";
import { PlaylistModel } from "../playlist/playlist.model";
import { SingleModel } from "../single/single.model";
import { TrackModel } from "../track/track.model";

export interface LibraryModel extends Base {}

export class LibraryModel extends TimeStamps {
  @prop({ ref: () => AlbumModel, default: [] })
  albums: Ref<AlbumModel>[];

  @prop({ ref: () => PlaylistModel, default: [] })
  playlists: Ref<PlaylistModel>[];

  @prop({ ref: () => EpModel, default: [] })
  eps: Ref<EpModel>[];

  @prop({ ref: () => SingleModel, default: [] })
  singles: Ref<SingleModel>[];

  @prop({ ref: () => TrackModel, default: [] })
  favorites: Ref<TrackModel>[];

  @prop({ ref: () => ArtistModel, default: [] })
  follows: Ref<ArtistModel>[];
}
