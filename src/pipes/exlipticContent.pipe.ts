import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UpdateTrackPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "body"){
      value.duration = Number(value.duration)
      if (value.eclipticContent === "true") value.eclipticContent = true
    }
    return value;
  }
}
