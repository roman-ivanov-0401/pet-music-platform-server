import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateSingleDto } from "./single.dto";
import { SingleModel } from "./single.model";
import { Types } from "mongoose";

@Injectable()
export class SingleService {
  constructor(
    @InjectModel(SingleModel) private readonly singleModel: ModelType<SingleModel>,
    private readonly fileService: FileService
  ) {}

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.singleModel
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
      return await this.singleModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<SingleModel, Types.ObjectId>,
    dto: UpdateSingleDto,
    cover: Express.Multer.File
  ) {
    try {
      const single = await this.singleModel.findById(_id);
      if (cover) {
        await this.fileService.removeFiles([single.cover]);
        const { url } = (
          await this.fileService.saveFiles([cover], "singles")
        )[0];
        single.cover = url;
      }
      for (let field in dto) {
        single[field] = dto[field];
      }
      return await single.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: Ref<SingleModel, Types.ObjectId>[]) {
    try {
      const singles: SingleModel[] = await this.singleModel.find({
        _id: { $in: _ids },
      });
      await this.fileService.removeFiles(singles.map((single) => single.cover));
      return await this.singleModel.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
