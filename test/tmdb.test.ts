import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosInstance = {
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
  get: jest.fn(),
  post: jest.fn(),
};

(axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

import {
  fetchTrendingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchSearchMovies,
  fetchMovieDetail,
  fetchWatchlistMovies,
  addToWatchlist,
  removeFromWatchlist,
} from "@/api/tmdb";
import type { Movie } from "@/types/movie";

interface MockData {
  data: {
    results?: Movie[];
    page?: number;
    total_pages?: number;
  };
}

describe("TMDB API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTrendingMovies", () => {
    it("returns trending movies successfully", async () => {
      const mockData = {
        data: { results: [{ id: 1, title: "Trending Movie" }] },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as MockData);

      const result = await fetchTrendingMovies();
      expect(result.error).toBeUndefined();
      expect(result.results).toHaveLength(1);
      expect(result.results[0].title).toBe("Trending Movie");
    });

    it("handles error for trending movies", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await fetchTrendingMovies();
      expect(result.results).toHaveLength(0);
      expect(result.error).toContain("Error");
    });
  });

  describe("fetchNowPlayingMovies", () => {
    it("returns now playing movies successfully", async () => {
      const mockData = {
        data: {
          results: [{ id: 2, title: "Now Playing" }],
          page: 1,
          total_pages: 5,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as MockData);

      const result = await fetchNowPlayingMovies();
      expect(result.error).toBeUndefined();
      expect(result.results).toHaveLength(1);
      expect(result.page).toBe(1);
      expect(result.total_pages).toBe(5);
    });

    it("handles error for now playing movies", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await fetchNowPlayingMovies();
      expect(result.results).toHaveLength(0);
      expect(result.error).toContain("Error");
    });
  });

  describe("fetchPopularMovies", () => {
    it("returns popular movies successfully", async () => {
      const mockData = {
        data: {
          results: [{ id: 3, title: "Popular Movie" }],
          page: 1,
          total_pages: 10,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as MockData);

      const result = await fetchPopularMovies();
      expect(result.error).toBeUndefined();
      expect(result.results).toHaveLength(1);
      expect(result.total_pages).toBe(10);
    });

    it("handles error for popular movies", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await fetchPopularMovies();
      expect(result.results).toHaveLength(0);
      expect(result.error).toContain("Error");
    });
  });

  describe("fetchSearchMovies", () => {
    it("returns search results successfully", async () => {
      const mockData = {
        data: {
          results: [{ id: 4, title: "Search Result" }],
          page: 1,
          total_pages: 2,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as MockData);

      const result = await fetchSearchMovies("test");
      expect(result.error).toBeUndefined();
      expect(result.results).toHaveLength(1);
      expect(result.results[0].title).toBe("Search Result");
    });

    it("handles error for search movies", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await fetchSearchMovies("fail");
      expect(result.results).toHaveLength(0);
      expect(result.error).toContain("Error");
    });
  });

  describe("fetchMovieDetail", () => {
    it("returns movie detail successfully", async () => {
      const mockMovie: Movie = {
        id: 123,
        title: "Detailed Movie",
        overview: "",
        backdrop_path: "",
        poster_path: "",
        release_date: "",
        vote_average: 7,
        vote_count: 500,
        videos: { results: [] },
        credits: { cast: [], crew: [] },
        reviews: { page: 1, total_pages: 1, total_results: 1, results: [] },
      };

      const mockData = { data: mockMovie };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as { data: Movie });

      const result = (await fetchMovieDetail(123)) as Movie;
      expect(result.title).toBe("Detailed Movie");
    });

    it("handles error for movie detail", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Not Found"));

      const result = (await fetchMovieDetail(999)) as { error: string };
      expect(result.error).toContain("Error");
    });
  });

  describe("fetchWatchlistMovies", () => {
    it("returns watchlist movies successfully", async () => {
      const mockData = {
        data: {
          results: [{ id: 5, title: "Watchlist Movie" }],
          page: 1,
          total_pages: 3,
        },
      };
      mockAxiosInstance.get.mockResolvedValueOnce(mockData as MockData);

      const result = await fetchWatchlistMovies();
      expect(result.error).toBeUndefined();
      expect(result.results).toHaveLength(1);
      expect(result.total_pages).toBe(3);
    });

    it("handles error for watchlist movies", async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await fetchWatchlistMovies();
      expect(result.results).toHaveLength(0);
      expect(result.error).toContain("Error");
    });
  });

  describe("addToWatchlist", () => {
    it("adds movie to watchlist successfully", async () => {
      const mockData = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValueOnce(
        mockData as { data: { success: boolean } }
      );

      const result = await addToWatchlist(10);
      expect(result.error).toBeUndefined();
    });

    it("handles error for addToWatchlist", async () => {
      mockAxiosInstance.post.mockRejectedValueOnce(new Error("Add Failed"));

      const result = await addToWatchlist(10);
      expect(result.error).toContain("Error");
    });
  });

  describe("removeFromWatchlist", () => {
    it("removes movie from watchlist successfully", async () => {
      const mockData = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValueOnce(
        mockData as { data: { success: boolean } }
      );

      const result = await removeFromWatchlist(11);
      expect(result.error).toBeUndefined();
    });

    it("handles error for removeFromWatchlist", async () => {
      mockAxiosInstance.post.mockRejectedValueOnce(new Error("Remove Failed"));

      const result = await removeFromWatchlist(11);
      expect(result.error).toContain("Error");
    });
  });
});
