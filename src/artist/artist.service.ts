import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { CreateArtistDto, UpdateArtistDto } from "./artist.dto";
import { ArtistModel } from "./artist.model";

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(ArtistModel)
    private readonly artistModel: ModelType<ArtistModel>,
    private readonly fileService: FileService
  ) {}

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.artistModel.find({
        name: { $regex: new RegExp(searchTerm, "i") },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(dto: CreateArtistDto, image: Express.Multer.File) {
    try {
      const { url } = (await this.fileService.saveFiles([image], "artists"))[0];
      return this.artistModel.create({
        ...dto,
        image: url,
      });
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
