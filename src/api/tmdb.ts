import client from "./client";
import getConfig from "@/config";

const { tmdbAccountId: accountId } = getConfig();

export async function fetchTrendingMovies() {
  const res = await client.get("/trending/movie/week");
  return res.data.results;
}

export async function fetchNowPlayingMovies(page: number = 1) {
  const res = await client.get("/movie/now_playing", {
    params: {
      page,
    },
  });
  return {
    results: res.data.results,
    page: res.data.page,
    total_pages: res.data.total_pages,
  };
}

export async function fetchPopularMovies(page: number = 1) {
  const res = await client.get("/movie/popular", {
    params: {
      page,
    },
  });
  return {
    results: res.data.results,
    page: res.data.page,
    total_pages: res.data.total_pages,
  };
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

export async function fetchMovieDetail(id: string | number) {
  const res = await client.get(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos,reviews",
    },
  });
  return res.data;
}

export async function fetchWatchlistMovies(
  page: number = 1,
  sortBy: string = "created_at.desc"
) {
  const res = await client.get(`/account/${accountId}/watchlist/movies`, {
    params: {
      page,
      sort_by: sortBy,
    },
  });
  return {
    results: res.data.results,
    page: res.data.page,
    total_pages: res.data.total_pages,
  };
}

export async function addToWatchlist(movieId: number) {
  await client.post(`/account/${accountId}/watchlist`, {
    media_type: "movie",
    media_id: movieId,
    watchlist: true,
  });
}

export async function removeFromWatchlist(movieId: number) {
  await client.post(`/account/${accountId}/watchlist`, {
    media_type: "movie",
    media_id: movieId,
    watchlist: false,
  });
}
