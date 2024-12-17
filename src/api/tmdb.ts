import client from "./client";
import getConfig from "@/config";
import type { Movie } from "@/types/movie";

const { tmdbAccountId: accountId } = getConfig();

interface MovieDetailResponse {
  movie?: Movie;
  error?: string;
}

export async function fetchTrendingMovies(): Promise<{
  results: Movie[];
  error?: string;
}> {
  try {
    const res = await client.get("/trending/movie/week");
    return {
      results: res.data.results,
    };
  } catch (error) {
    return {
      results: [],
      error: `${error}`,
    };
  }
}

export async function fetchNowPlayingMovies(page: number = 1): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  error?: string;
}> {
  try {
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
  } catch (error) {
    return {
      results: [],
      page: 1,
      total_pages: 1,
      error: `${error}`,
    };
  }
}

export async function fetchPopularMovies(page: number = 1): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  error?: string;
}> {
  try {
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
  } catch (error) {
    return {
      results: [],
      page: 1,
      total_pages: 1,
      error: `${error}`,
    };
  }
}

export async function fetchSearchMovies(
  query: string,
  page: number = 1
): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  error?: string;
}> {
  try {
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
  } catch (error) {
    return {
      results: [],
      page: 1,
      total_pages: 1,
      error: `${error}`,
    };
  }
}

export async function fetchMovieDetail(
  id: string | number
): Promise<MovieDetailResponse> {
  try {
    const res = await client.get(`/movie/${id}`, {
      params: {
        append_to_response: "credits,videos,reviews",
      },
    });
    return res.data;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
}

export async function fetchWatchlistMovies(
  page: number = 1,
  sortBy: string = "created_at.desc"
): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  error?: string;
}> {
  try {
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
  } catch (error) {
    return {
      results: [],
      page: 1,
      total_pages: 1,
      error: `${error}`,
    };
  }
}

export async function addToWatchlist(
  movieId: number
): Promise<{ error?: string }> {
  try {
    const res = await client.post(`/account/${accountId}/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    });
    return res.data;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
}

export async function removeFromWatchlist(
  movieId: number
): Promise<{ error?: string }> {
  try {
    const res = await client.post(`/account/${accountId}/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: false,
    });
    return res.data;
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
}
