import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateArtistDto } from "./artist.dto";
import { ArtistModel } from "./artist.model";

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(ArtistModel)
    private readonly artistModel: ModelType<ArtistModel>,
    private readonly fileService: FileService
  ) {}

  async getById(_id: Ref<ArtistModel, Types.ObjectId>) {
    return await this.artistModel.findById(_id, "-__v -createdAt -updatedAt");
  }

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.artistModel.find({
        name: { $regex: new RegExp(searchTerm, "i") },
      }, "-__v -createdAt -updatedAt -albums -eps -singles");
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.artistModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(_id: string, dto: UpdateArtistDto, image: Express.Multer.File) {
    try {
      const artist = await this.artistModel.findById(_id);
      if (image) {
        await this.fileService.removeFiles([artist.image]);
        const { url } = (
          await this.fileService.saveFiles([image], "artists")
        )[0];
        artist.image = url;
      }
      if (dto.name) artist.name = dto.name;
      return await artist.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async follow(_id: Ref<ArtistModel, Types.ObjectId>) {
    try {
      await this.artistModel.updateOne(
        { _id },
        { $inc: { followersCount: 1 } }
      );
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unfollow(_id: Ref<ArtistModel, Types.ObjectId>) {
    try {
      await this.artistModel.updateOne(
        { _id },
        { $inc: { followersCount: -1 } }
      );
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: string[]) {
    try {
      const artists = await this.artistModel.find({ _id: { $in: _ids } });
      await this.fileService.removeFiles(artists.map((art) => art.image));
      await this.artistModel.deleteMany({ _id: { $in: _ids } });
      return artists;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
