import { AlbumModel } from "../album/album.model";
import { Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { LibraryModel } from "./library.model";
import { EpModel } from "../ep/ep.model";
import { SingleModel } from "../single/single.model";
import { PlaylistModel } from "../playlist/playlist.model";
import { TrackModel } from "../track/track.model";
import { ArtistModel } from "../artist/artist.model";

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(LibraryModel)
    private readonly libraryModel: ModelType<LibraryModel>
  ) {}
  async create() {
    return await this.libraryModel.create({});
  }

  async delete(_id: Ref<LibraryModel, Types.ObjectId>) {
    return await this.libraryModel.deleteOne({ _id });
  }

  async addAlbum(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _albumId: Ref<AlbumModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { albums: _albumId } },
      { new: true }
    );
  }

  async removeAlbum(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _albumId: Ref<AlbumModel, Types.ObjectId>
  ) {
    return this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { albums: _albumId } },
      { new: true }
    );
  }

  async addEp(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _epId: Ref<EpModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { eps: _epId } },
      { new: true }
    );
  }

  async removeEp(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _epId: Ref<EpModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { eps: _epId } },
      { new: true }
    );
  }

  async addSingle(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _singleId: Ref<SingleModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { singles: _singleId } },
      { new: true }
    );
  }

  async removeSingle(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _singleId: Ref<SingleModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { singles: _singleId } },
      { new: true }
    );
  }

  async addPlaylist(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _playlistId: Ref<PlaylistModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { playlists: _playlistId } },
      { new: true }
    );
  }

  async removePlaylist(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _playlistId: Ref<PlaylistModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { playlists: _playlistId } },
      { new: true }
    );
  }

  async addFavorite(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _trackId: Ref<TrackModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { favorites: _trackId } },
      { new: true }
    );
  }

  async removeFavorite(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _trackId: Ref<TrackModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { favorites: _trackId } },
      { new: true }
    );
  }

  async addFollow(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _followId: Ref<ArtistModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $push: { follows: _followId } },
      { new: true }
    );
  }

  async removeFollow(
    _id: Ref<LibraryModel, Types.ObjectId>,
    _followId: Ref<ArtistModel, Types.ObjectId>
  ) {
    return await this.libraryModel.findByIdAndUpdate(
      { _id },
      { $pull: { follows: _followId } },
      { new: true }
    );
  }
}
