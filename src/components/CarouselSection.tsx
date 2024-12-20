"use client";

import React, { useCallback } from "react";
import { Carousel, Button, Spin } from "antd";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Movie } from "@/types/movie";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";

const CarouselItem = styled.img`
  width: 100%;
  height: calc(100vh - 60px);
  object-fit: cover;
  position: relative;
`;

const CarouselContent = styled.div`
  position: absolute;
  width: auto;
  min-width: 300px;
  max-width: 100vw;
  bottom: 10%;
  padding: 20px 50px 30px 50px;
  background: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 20px 30px 30px 30px;
    bottom: 0;
  }
`;

const CarouselTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarouselDescription = styled.p`
  font-size: 1.6rem;
  margin-bottom: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CarouselDetailButton = styled(Button)`
  padding: 25px 20px;
  font-size: 1.6rem;
  font-weight: 500;
`;

const InfoIcon = styled(InfoCircleOutlined)`
  margin-right: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(50vh);
`;

interface CarouselSectionProps {
  limit?: number;
  movies: Movie[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ movies, limit }) => {
  const { width, height } = useWindowSize();
  const router = useRouter();

  const limitedMovies = limit ? movies.slice(0, limit) : movies;

  const imgUrl = useCallback(
    (movie: Movie) => {
      if (width > height) {
        return `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      }
      return `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    },
    [width, height]
  );

  if (isEmpty(movies)) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <Carousel adaptiveHeight draggable autoplay>
      {limitedMovies.map((movie) => (
        <div key={movie.id}>
          <CarouselItem src={imgUrl(movie)} />
          <CarouselContent>
            <CarouselTitle>{movie.title}</CarouselTitle>
            <CarouselDescription>{movie.overview}</CarouselDescription>
            <CarouselDetailButton
              color="default"
              variant="filled"
              size="large"
              onClick={() => {
                router.push(`/movie/${movie.id}`);
              }}
            >
              <InfoIcon />
              詳情
            </CarouselDetailButton>
          </CarouselContent>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSection;
