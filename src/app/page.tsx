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
    await fetchPopularMovies(),
    await fetchTrendingMovies(),
    await fetchNowPlayingMovies(),
  ]);

  return (
    <div>
      <CarouselSection movies={bannerMovies.results} limit={5} />
      <div style={{ padding: "20px" }}>
        <h2>本週熱門</h2>
        <MovieGrid
          movies={trendingMovies.results}
          loading={isEmpty(trendingMovies.results)}
        />
        <h2>新上映</h2>
        <MovieGrid
          movies={nowPlayingMovies.results}
          loading={isEmpty(nowPlayingMovies.results)}
        />
      </div>
    </div>
  );
}
