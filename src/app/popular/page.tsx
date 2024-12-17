"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { fetchPopularMovies } from "@/api/tmdb";
import type { Movie } from "@/types/movie";
import NoResults from "@/components/NoResults";
import HorizontalMovieGrid from "@/components/HorizontalMovieGrid";

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const LoadMoreText = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default function PopularPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasNextPage = pagination.page < pagination.total_pages;

  const fetchData = useCallback(async (page: number, append = false) => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies(page);
      setMovies((prev) => (append ? [...prev, ...data.results] : data.results));
      setPagination({ page: data.page, total_pages: data.total_pages });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(append ? "載入更多電影時出錯" : "無法取得熱門電影資料");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !loading && !error) {
          fetchData(pagination.page + 1, true);
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, loading, error, pagination.page, fetchData]);

  const noResults = movies.length === 0 && !loading && !error;

  return (
    <PageContainer>
      <Title>熱門電影</Title>

      {error && <div>{error}</div>}
      {noResults && <NoResults />}

      <HorizontalMovieGrid
        movies={movies}
        loading={loading && movies.length === 0}
      />

      {loading && movies.length > 0 && (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      )}

      {hasNextPage && !error && !loading && (
        <LoadMoreText ref={loadMoreRef}>load more...</LoadMoreText>
      )}
    </PageContainer>
  );
}
