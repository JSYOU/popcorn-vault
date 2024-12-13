import axios from "axios";
import getConfig from "@/config";

const envConfig = getConfig();
const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${envConfig.tmdbApiKey}`,
  },
});

client.interceptors.request.use(
  (config) => {
    const params = { ...config.params, language: "zh-TW" };
    return { ...config, params };
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
