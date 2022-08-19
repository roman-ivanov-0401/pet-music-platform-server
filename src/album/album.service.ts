import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateAlbumDto } from "./album.dto";
import { AlbumModel } from "./album.model";
import { Types } from "mongoose";

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(AlbumModel) private readonly albumModel: ModelType<AlbumModel>,
    private readonly fileService: FileService
  ) {}

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.albumModel
        .find(
          {
            name: { $regex: new RegExp(searchTerm, "i") },
          },
          "-createdAt -updatedAt -__v"
        )
        .populate({ path: "artists", select: "name" })
        .populate({
          path: "genres",
          select: "name",
        })
        .populate({
          path: "tracks",
          select: "-updatedAt -__v -lyrics",
          populate: [
            { path: "artists", select: "name" },
            { path: "feats", select: "name" },
          ],
        })
        .exec();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.albumModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<AlbumModel, Types.ObjectId>,
    dto: UpdateAlbumDto,
    cover: Express.Multer.File
  ) {
    try {
      const album = await this.albumModel.findById(_id);
      if (cover) {
        await this.fileService.removeFiles([album.cover]);
        const { url } = (
          await this.fileService.saveFiles([cover], "albums")
        )[0];
        album.cover = url;
      }
      for (let field in dto) {
        album[field] = dto[field];
      }
      return await album.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: Ref<AlbumModel, Types.ObjectId>[]) {
    try {
      const albums: AlbumModel[] = await this.albumModel.find({
        _id: { $in: _ids },
      });
      await this.fileService.removeFiles(albums.map((album) => album.cover));
      return await this.albumModel.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
