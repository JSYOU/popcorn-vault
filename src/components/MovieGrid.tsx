"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import { Movie } from "@/types/movie";
import Rate from "@/components/Rate";
import MovieDetailModal from "@/components/MovieDetailModal";
import LoadingGrid from "@/components/LoagingGrid";

const { Meta } = Card;

const InfoCard = styled(Card)`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    & .ant-card-body {
      padding: 15px;
    }
  }
`;

const InfoMeta = styled(Meta)`
  &.ant-card-meta-title {
    overflow: hidden;
  }
`;

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (loading) {
    return <LoadingGrid />;
  }

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={8} md={6} lg={4} xl={3}>
            <InfoCard
              hoverable
              cover={
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              }
              onClick={() => handleCardClick(movie)}
            >
              <InfoMeta
                title={movie.title}
                description={<Rate rate={movie.vote_average} />}
              />
            </InfoCard>
          </Col>
        ))}
      </Row>
      <MovieDetailModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default MovieGrid;
