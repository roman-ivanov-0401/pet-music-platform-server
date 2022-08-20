import { Auth } from "../auth/auth.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Role } from "../user/user.model";
import { RadioService } from "./radio.service";
import { Ref } from "@typegoose/typegoose";
import { RadioModel } from "./radio.model";
import { Types } from "mongoose";
import { DeleteRadiosDto, UpdateRadioDto } from "./radio.dto";

@Controller("radios")
export class RadioController {
  constructor(private readonly radioService: RadioService) {}

  @Get("/:_id")
  getById(@Param("_id") _id: Ref<RadioModel, Types.ObjectId>) {
    return this.radioService.getById(_id);
  }

  @Get("")
  getBySearchTerm(@Query("searchTerm") searchTerm: string) {
    return this.radioService.getBySearchTerm(searchTerm);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Post()
  create() {
    return this.radioService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Put("/:_id")
  update(
    @Param("_id") _id: Ref<RadioModel, Types.ObjectId>,
    @Body() dto: UpdateRadioDto
  ) {
    return this.radioService.update(_id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Auth(Role.admin)
  @Delete()
  deleteByIds(@Body() dto: DeleteRadiosDto) {
    return this.radioService.deleteByIds(dto._ids);
  }
}
