"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Select, Spin } from "antd";
import styled from "styled-components";
import { fetchWatchlistMovies } from "@/api/tmdb";
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

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
`;

const SortSelect = styled(Select<string>)`
  width: 200px;
`;

const LoadMoreText = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [sortBy, setSortBy] = useState("created_at.desc");
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const hasNextPage = pagination.page < pagination.total_pages;

  const fetchData = useCallback(
    async (page: number, sort: string, append = false) => {
      setLoading(true);
      try {
        const data = await fetchWatchlistMovies(page, sort);
        setMovies((prev) =>
          append ? [...prev, ...data.results] : data.results
        );
        setPagination({ page: data.page, total_pages: data.total_pages });
        setError(null);
      } catch (err) {
        console.error(err);
        setError(append ? "載入更多電影時出錯" : "無法取得待看清單資料");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refreshWatchlist = useCallback(async () => {
    await fetchData(1, sortBy, false);
  }, [fetchData, sortBy]);

  useEffect(() => {
    fetchData(1, sortBy, false);
  }, [sortBy, fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !loading && !error) {
          fetchData(pagination.page + 1, sortBy, true);
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, loading, error, pagination.page, sortBy, fetchData]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const noResults = movies.length === 0 && !loading && !error;

  return (
    <PageContainer>
      <Title>我的待看清單</Title>
      <HeaderRow>
        <SortSelect
          defaultValue={sortBy}
          onChange={handleSortChange}
          options={[
            { label: "加入時間(新->舊)", value: "created_at.desc" },
            { label: "加入時間(舊->新)", value: "created_at.asc" },
          ]}
        />
      </HeaderRow>

      {error && <div>{error}</div>}
      {noResults && <NoResults />}

      <HorizontalMovieGrid
        movies={movies}
        loading={loading && movies.length === 0}
        onRefresh={refreshWatchlist}
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
