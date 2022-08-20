import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Ref } from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateTrackDto } from "./track.dto";
import { TrackModel } from "./track.model";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(TrackModel) private readonly trackModel: ModelType<TrackModel>,
    private readonly fileService: FileService
  ) {}

  async getById(_id: Ref<TrackModel, Types.ObjectId>) {
    return await this.trackModel.findById(_id, "-__v -createdAt -updatedAt").populate([
      {
        path: "artists",
        select: "name",
      },
      {
        path: "feats",
        select: "name",
      },
    ]);
  }

  async create() {
    try {
      return await this.trackModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<TrackModel, Types.ObjectId>,
    dto: UpdateTrackDto,
    audio: Express.Multer.File
  ) {
    try {
      const track = await this.trackModel.findById(_id);
      if (audio) {
        await this.fileService.removeFiles([track.audio]);
        const { url } = (
          await this.fileService.saveFiles([audio], "tracks")
        )[0];
        track.audio = url;
      }
      for (let field in dto) {
        track[field] = dto[field];
      }
      return await track.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: Ref<TrackModel, Types.ObjectId>) {
    try {
      return await this.trackModel.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
