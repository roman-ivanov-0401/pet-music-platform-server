import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { CreateAlbumDto } from "./album.dto";
import { AlbumModel } from "./album.model";

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(AlbumModel) private readonly albumModel: ModelType<AlbumModel>,
    private readonly fileService: FileService
  ) {}
  async create(dto: CreateAlbumDto, cover: Express.Multer.File) {
    try {
      const { url } = (await this.fileService.saveFiles([cover], "albums"))[0];
      return await this.albumModel.create({
        ...dto,
        cover: url,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  async update() {}
}
