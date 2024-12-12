"use client";

import React, { useCallback } from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Movie } from "@/types/movie";
import { useWindowSize } from "@/hooks/useWindowSize";

const CarouselItem = styled.img`
  width: 100%;
  height: 100vh;
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
  background: rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 20px 30px 30px 30px;
    bottom: 0;
  }
`;

const CarouselTitle = styled.h2`
  font-size: 2.8rem;
  color: #fff;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarouselDescription = styled.p`
  font-size: 1.6rem;
  color: #fff;
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

const CarouselDetailButton = styled.button`
  background: #fff;
  color: #000;
  padding: 10px 20px;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 10px;
  border: none;

  &:hover {
    background: #aaa;
    color: #000;
  }

  &:active {
    background: #888;
    color: #000;
  }
`;
const InfoIcon = styled(InfoCircleOutlined)`
  margin-right: 10px;
`;

interface CarouselSectionProps {
  movies: Movie[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ movies }) => {
  const { width, height } = useWindowSize();

  const imgUrl = useCallback(
    (movie: Movie) => {
      if (width > height) {
        return `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
      }
      return `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    },
    [width, height]
  );

  return (
    <Carousel adaptiveHeight draggable autoplay>
      {movies.map((movie) => (
        <div key={movie.id}>
          <CarouselItem src={imgUrl(movie)} />
          <CarouselContent>
            <CarouselTitle>{movie.title}</CarouselTitle>
            <CarouselDescription>{movie.overview}</CarouselDescription>
            <CarouselDetailButton
              onClick={() => {
                console.log("click");
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
