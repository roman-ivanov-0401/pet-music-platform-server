import { IsArray, IsString } from "class-validator";

export class UpdateBannerDto {
    @IsString()
    title?: string;

    @IsString()
    link?: string;
}

export class DeleteBannersDto {
    @IsArray()
    _ids: string[]
}