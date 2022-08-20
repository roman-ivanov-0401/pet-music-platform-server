import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Ref } from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { FileService } from "src/file/file.service";
import { UpdateChartDto } from "./chart.dto";
import { ChartModel } from "./chart.model";

@Injectable()
export class ChartService {
  constructor(
    @InjectModel(ChartModel) private readonly chartMoled: ModelType<ChartModel>,
    private readonly fileService: FileService
  ) {}

  async getById(_id: Ref<ChartModel, Types.ObjectId>) {
    try {
      return await this.chartMoled
        .findById(_id, "-__v -createdAt -updatedAt")
        .populate({
          path: "tracks",
          select: "-__v -createdAt -updatedAt -lyrics",
        });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.chartMoled.find({
        name: { $regex: new RegExp(searchTerm, "i") },
      }, "-tracks -createdAt -updatedAt -__v");
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.chartMoled.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    _id: Ref<ChartModel, Types.ObjectId>,
    dto: UpdateChartDto,
    image: Express.Multer.File
  ) {
    try {
      const chart = await this.chartMoled.findByIdAndUpdate(_id, dto, {
        new: true,
      });
      if (image) {
        await this.fileService.removeFiles([chart.image]);
        const { url } = (
          await this.fileService.saveFiles([image], "charts")
        )[0];
        chart.image = url;
        return await chart.save();
      }

      return chart;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteByIds(_ids: Ref<ChartModel, Types.ObjectId>[]) {
    try {
      const charts = await this.chartMoled.find({ _id: { $in: _ids } });
      await this.fileService.removeFiles(charts.map(({ image }) => image));
      return await this.chartMoled.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
