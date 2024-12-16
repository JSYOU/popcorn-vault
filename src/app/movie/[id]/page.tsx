"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { Spin, message } from "antd";
import { fetchMovieDetail } from "@/api/tmdb";
import ActorList from "@/components/ActorList";
import DetailHeader from "@/components/DetailHeader";
import Trailer from "@/components/Trailer";
import Reviews from "@/components/Reviews";
import type { Movie, CastMember, ReviewResult } from "@/types/movie";

const Container = styled.div`
  padding: 60px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CastSection = styled.div`
  margin-top: 30px;
`;

const CastTitle = styled.h2`
  margin-bottom: 10px;
`;

export default function MoviePage() {
  const { id }: { id: string } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieDetail(id)
      .then((data) => setMovie(data))
      .catch(() => message.error("無法取得電影詳細資訊"))
      .finally(() => setLoading(false));
  }, [id]);

  const cast = useMemo<CastMember[]>(() => movie?.credits?.cast || [], [movie]);
  const director = useMemo<string | null>(
    () => movie?.credits?.crew?.find((c) => c.job === "Director")?.name || null,
    [movie]
  );
  const trailerKey = useMemo<string | null>(
    () =>
      movie?.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      )?.key || null,
    [movie]
  );
  const reviews = useMemo<ReviewResult[]>(
    () => movie?.reviews?.results || [],
    [movie]
  );

  if (loading)
    return (
      <Container>
        <Spin />
      </Container>
    );
  if (!movie) return <Container>找不到電影詳細資料</Container>;

  return (
    <Container>
      <DetailHeader
        title={movie.title}
        posterPath={movie.poster_path}
        rate={movie.vote_average}
        voteCount={movie.vote_count}
        director={director}
        releaseDate={movie.release_date}
        overview={movie.overview}
      />
      <Trailer trailerKey={trailerKey} />
      <CastSection>
        <CastTitle>演員陣容</CastTitle>
        <ActorList actors={cast} />
      </CastSection>
      <Reviews reviews={reviews} />
    </Container>
  );
}
