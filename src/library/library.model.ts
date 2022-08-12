import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { AlbumModel } from "@album/album.model";
import { ArtistModel } from "src/artist/artist.model";
import { EpModel } from "src/ep/ep.model";
import { PlaylistModel } from "src/playlist/playlist.model";
import { SingleModel } from "src/single/single.model";
import { TrackModel } from "src/track/track.model";

export interface LibraryModel extends Base{}

export class LibraryModel extends TimeStamps{
    @prop({ref: () => AlbumModel})
    albums: Ref<AlbumModel>[]

    @prop({ref: () => PlaylistModel})
    playlists: Ref<PlaylistModel>[]

    @prop({ref: () => EpModel})
    eps: Ref<EpModel>[]

    @prop({ref: () => SingleModel})
    singles: Ref<SingleModel>[]

    @prop({ref: () => TrackModel})
    favorites: Ref<TrackModel>[]

    @prop({ref: () => ArtistModel})
    follows: Ref<ArtistModel>[]
}