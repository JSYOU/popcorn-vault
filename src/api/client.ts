import axios from "axios";

const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

client.interceptors.request.use(
  (config) => {
    return { ...config, params: { language: "zh-TW" } };
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
