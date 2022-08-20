import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "src/file/file.service";
import { DeletePlaylistsDto, UpdatePlaylistDto } from "./playlist.dto";
import { PlaylistModel } from "./playlist.model";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(PlaylistModel)
    private readonly playlistModel: ModelType<PlaylistModel>,
    private readonly fileService: FileService
  ) {}

  async getById(_id: Ref<PlaylistModel, Types.ObjectId>) {
    try {
      return await this.playlistModel
        .findById(_id, "-__v -createdAt -updatedAt")
        .populate([
          {
            path: "author",
            select: "name",
          },
          {
            path: "tracks",
            select: "-__v -createdAt -updatedAt -lyrics",
            populate: [
              {
                path: "artists",
                select: "name",
              },
              {
                path: "feats",
                select: "name",
              },
            ],
          },
        ]);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.playlistModel.find(
        { name: { $regex: new RegExp(searchTerm, "i") } },
        "-__v"
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.playlistModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<PlaylistModel, Types.ObjectId>,
    dto: UpdatePlaylistDto,
    image: Express.Multer.File
  ) {
    try {
      const playlist = await this.playlistModel.findByIdAndUpdate(_id, dto, {
        new: true,
      });
      if (image) {
        await this.fileService.removeFiles([playlist.image]);
        const { url } = (
          await this.fileService.saveFiles([image], "playlists")
        )[0];
        playlist.image = url;
        return await playlist.save();
      }
      return playlist;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async incrementPlays(_id: Ref<PlaylistModel, Types.ObjectId>) {
    try {
      return await this.playlistModel.findByIdAndUpdate(
        _id,
        { $inc: { plays: 1 } },
        { new: true }
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  async deleteByIds(dto: DeletePlaylistsDto) {
    try {
      const playlists = await this.playlistModel.find({
        _id: { $in: dto._ids },
      });
      await this.fileService.removeFiles(playlists.map(({ image }) => image));
      return await this.playlistModel.deleteMany({ _id: { $in: dto._ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }
}
