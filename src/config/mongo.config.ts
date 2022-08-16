import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoDBConfig = async (
  configservice: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: configservice.get("MONGO_URI"),
});
