import client from "./client";

export async function fetchTrendingMovies() {
  const res = await client.get("/trending/movie/week");
  return res.data.results;
}

export async function fetchNowPlayingMovies() {
  const res = await client.get("/movie/now_playing");
  return res.data.results;
}

export async function fetchMovieBannerList() {
  const res = await client.get("/movie/popular");
  return res.data.results.slice(0, 5);
}

export async function fetchSearchMovies(query: string, page: number = 1) {
  const res = await client.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return {
    results: res.data.results,
    total_pages: res.data.total_pages,
    page: res.data.page,
  };
}
