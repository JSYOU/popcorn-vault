"use client";

import React from "react";
import styled from "styled-components";
import { Row, Col, Card, Rate } from "antd";
import Image from "next/image";
import { Movie } from "@/types/movie";

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
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8} md={6} lg={4} xl={3}>
          <InfoCard loading />
        </Col>
        <Col xs={12} sm={8} md={6} lg={4} xl={3}>
          <InfoCard loading />
        </Col>
      </Row>
    );
  }

  const ShowRate = ({ rate }: { rate: number }) => {
    return (
      <Rate
        disabled
        allowHalf
        defaultValue={rate / 2}
        style={{ color: "#fadb14" }}
      />
    );
  };

  return (
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
          >
            <InfoMeta
              title={movie.title}
              description={<ShowRate rate={movie.vote_average} />}
            />
          </InfoCard>
        </Col>
      ))}
    </Row>
  );
};

export default MovieGrid;