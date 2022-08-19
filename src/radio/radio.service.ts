import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { UpdateRadioDto } from "./radio.dto";
import { RadioModel } from "./radio.model";

@Injectable()
export class RadioService {
  constructor(
    @InjectModel(RadioModel) private readonly radioModel: ModelType<RadioModel>
  ) {}

  async getBySearchTerm(searchTerm: string) {
    try {
      return await this.radioModel
        .find(
          {
            name: { $regex: new RegExp(searchTerm, "i") },
          },
          "-updatedAt -createdAt -__v"
        )
        .populate({
          path: "tracks",
          select: "-lyrics -__v -updatedAt",
          populate: [
            { path: "artists", select: "name" },
            { path: "feats", select: "name" },
          ],
        });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create() {
    try {
      return await this.radioModel.create({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(_id: Ref<RadioModel, Types.ObjectId>, dto: UpdateRadioDto) {
    return this.radioModel.findByIdAndUpdate({ _id }, dto, { new: true });
  }

  async deleteByIds(_ids: Ref<RadioModel, Types.ObjectId>[]) {
    try {
      return this.radioModel.deleteMany({ _id: { $in: _ids } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
