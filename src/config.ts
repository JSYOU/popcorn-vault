import dotenv from "dotenv";
import { pickBy } from "lodash";

dotenv.config();

export interface IConfig {
  env: string;
  tmdbApiKey: string;
}

const defaultConfigs = {
  env: "development",
  tmdbApiKey: process.env.TMDB_API_KEY || "",
};

const localConfig = {
  env: "local",
};

const prodConfig = {
  env: "production",
};

const getConfig = (): IConfig => {
  const env = (process.env.NODE_ENV as string) || "development";

  const envConfigs = pickBy({
    tmdbApiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  });

  switch (env) {
    case "local":
      return { ...defaultConfigs, ...localConfig, ...envConfigs };
    case "production":
      return { ...defaultConfigs, ...prodConfig, ...envConfigs };
    default:
      return { ...defaultConfigs, ...envConfigs };
  }
};

export default getConfig;