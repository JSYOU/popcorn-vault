import React from "react";
import { isEmpty } from "lodash";
import {
  fetchTrendingMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
} from "@/api/tmdb";
import CarouselSection from "@/components/CarouselSection";
import MovieGrid from "@/components/MovieGrid";

export default async function HomePage() {
  const [bannerMovies, trendingMovies, nowPlayingMovies] = await Promise.all([
    (await fetchPopularMovies()).results,
    fetchTrendingMovies(),
    (await fetchNowPlayingMovies()).results,
  ]);

  return (
    <div>
      <CarouselSection movies={bannerMovies} />
      <div style={{ padding: "20px" }}>
        <h2>熱門電影</h2>
        <MovieGrid movies={trendingMovies} loading={isEmpty(trendingMovies)} />
        <h2>新上映</h2>
        <MovieGrid
          movies={nowPlayingMovies}
          loading={isEmpty(nowPlayingMovies)}
        />
      </div>
    </div>
  );
}
