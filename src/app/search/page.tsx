"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Input, Button, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { fetchSearchMovies } from "@/api/tmdb";
import type { Movie } from "@/types/movie";
import { isEmpty } from "lodash";
import HorizontalMovieGrid from "@/components/HorizontalMovieGrid";
import NoResults from "@/components/NoResults";
import SearchQueryProvider from "@/components/SearchQueryProvider";

const Page = styled.div`
  height: 100%;
  width: 100vw;
`;

const HeaderRow = styled.div<{ zoomOut: boolean }>`
  position: sticky;
  background: ${(props) =>
    props.zoomOut ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  top: 0;
  z-index: 999;
  backdrop-filter: blur(8px);
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: ${(props) => (props.zoomOut ? "60px" : "60vh")};
  transition: height 0.2s ease;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 10px;

  && .ant-btn-icon span {
    font-size: 2rem;
  }
`;

const SearchInput = styled(Input)<{ zoomOut: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  width: 600px;
  max-width: calc(100% - 150px);
  border-bottom: ${(props) =>
    props.zoomOut ? "0.5px solid #ccc" : "1px solid #ccc"};
  border-radius: 0;
  font-size: ${(props) => (props.zoomOut ? "1.4rem" : "2rem")};
  background: transparent;

  .ant-input-clear-icon {
    color: #fff;
    font-size: 1.2rem;
  }
`;

const ListContainer = styled.div`
  padding: 20px;
`;

const LoadingAnimation = styled(Spin)`
  display: block;
  margin: 20px auto;
`;

const AutoLoadText = styled.div`
  text-align: center;
  margin: 20px 0;
`;

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(false);

  const autoloadElement = useRef<HTMLDivElement>(null);

  const zoomOut = !isEmpty(query);
  const hasNextPage = pagination.page < pagination.total_pages;
  const noResults = movies.length === 0 && query && !loading;

  const closeOverlay = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleQueryChange = useCallback((q: string) => {
    setQuery(q);
  }, []);

  useEffect(() => {
    if (isEmpty(query)) {
      setMovies([]);
      setPagination({ page: 1, total_pages: 1 });
      return;
    }
    setLoading(true);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        setLoading(true);
        fetchSearchMovies(query).then((data) => {
          setMovies(data.results);
          setPagination({ page: data.page, total_pages: data.total_pages });
          setLoading(false);
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const onSearch = (value: string) => {
    router.replace(`/search?q=${encodeURIComponent(value)}`);
    setQuery(value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !loading) {
          setLoading(true);
          fetchSearchMovies(query, pagination.page + 1).then((data) => {
            setMovies((prev) => [...prev, ...data.results]);
            setPagination({ page: data.page, total_pages: data.total_pages });
            setLoading(false);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (autoloadElement.current) {
      observer.observe(autoloadElement.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, loading, pagination.page, query]);

  return (
    <Suspense>
      <Page>
        <SearchQueryProvider onQueryChange={handleQueryChange} />
        <HeaderRow zoomOut={zoomOut}>
          <BackButton
            type="text"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={closeOverlay}
          />

          <SearchInput
            variant="borderless"
            placeholder="搜尋電影"
            defaultValue={query}
            onChange={(e) => onSearch(e.target.value)}
            allowClear
            zoomOut={zoomOut}
          />
        </HeaderRow>
        <ListContainer>
          {noResults && <NoResults />}
          <HorizontalMovieGrid movies={movies} />
          {loading && <LoadingAnimation size="large" />}
          {hasNextPage && (
            <AutoLoadText ref={autoloadElement}>load more...</AutoLoadText>
          )}
        </ListContainer>
      </Page>
    </Suspense>
  );
}
