import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateEpDto } from "./ep.dto";
import { EpModel } from "./ep.model";
import { Types } from "mongoose";

@Injectable()
export class EpService {
  constructor(
    @InjectModel(EpModel) private readonly epModel: ModelType<EpModel>,
    private readonly fileService: FileService
  ) {}

  async getById(_id: Ref<EpModel, Types.ObjectId>) {
    return await this.epModel
      .findById(_id, "-__v -createdAt -updatedAt")
      .populate([
        {
          path: "artists",
          select: "-albums -eps -singles -__v -createdAt -updatedAt",
        },
        {
          path: "genres",
          select: "-__v -createdAt -updatedAt"
        },
        {
          path: "tracks",
          select: "-__v -createdAt -updatedAt -lyrics",
          populate: [
            {
              path: "artists",
              select: "name"
            },
            {
              path: "feats",
              select: "name"
            }
          ]
        },
      ]).exec();
  }

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.epModel
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
      return await this.epModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<EpModel, Types.ObjectId>,
    dto: UpdateEpDto,
    cover: Express.Multer.File
  ) {
    try {
      const ep = await this.epModel.findById(_id);
      if (cover) {
        await this.fileService.removeFiles([ep.cover]);
        const { url } = (await this.fileService.saveFiles([cover], "eps"))[0];
        ep.cover = url;
      }
      for (let field in dto) {
        ep[field] = dto[field];
      }
      return await ep.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: Ref<EpModel, Types.ObjectId>[]) {
    try {
      const albums: EpModel[] = await this.epModel.find({
        _id: { $in: _ids },
      });
      await this.fileService.removeFiles(albums.map((album) => album.cover));
      return await this.epModel.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
