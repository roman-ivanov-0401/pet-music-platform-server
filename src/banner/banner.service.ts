import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "../file/file.service";
import { UpdateBannerDto } from "./banner.dto";
import { BannerModel } from "./banner.model";

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(BannerModel)
    private readonly bannerModel: ModelType<BannerModel>,
    private readonly fileService: FileService
  ) {}

    async getById(_id: Ref<BannerModel, Types.ObjectId>){
      return await this.bannerModel.findById(_id, "-__v -createdAt -updatedAt")
    }

  async getAll() {
    try {
      return await this.bannerModel.find({}, "-__v -createdAt -updatedAt");
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getNewest() {
    try {
      return await this.bannerModel
        .find({}, "-__v -createdAt -updatedAt")
        .sort({ createdAt: -1 })
        .limit(3)
        .exec();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.bannerModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(_id: Ref<BannerModel, Types.ObjectId>, dto: UpdateBannerDto, image: Express.Multer.File) {
    try {
      const banner = await this.bannerModel.findById(_id);
      if (image) {
        await this.fileService.removeFiles([banner.image]);
        const imageData = await this.fileService.saveFiles([image], "banners");
        banner.image = imageData[0].url;
      }
      if (dto.title) banner.title = dto.title;
      if (dto.link) banner.link = dto.link;
      return await banner.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: string[]) {
    try {
      const banners = await this.bannerModel.find({_id: {$in: _ids}})
      await this.fileService.removeFiles(banners.map(banner => banner.image));
      await this.bannerModel.deleteMany({_id: {$in: _ids}})
      return banners;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
