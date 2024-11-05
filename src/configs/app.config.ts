import { registerAs } from "@nestjs/config";
import { ConfigEnum } from "../shared/enums/config.enum.js";

export default registerAs(ConfigEnum.APP, () => {
  if (typeof process.env.PORT !== "string") {
    throw new Error(`PORT env variable is not specified`);
  }

  return { port: parseInt(process.env.PORT) };
});
