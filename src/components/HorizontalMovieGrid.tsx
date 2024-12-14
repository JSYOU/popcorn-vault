"use client";

import React from "react";
import styled from "styled-components";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import { Movie } from "@/types/movie";
import Rate from "@/components/Rate";

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

const Description = styled.div`
  & > span {
    display: flex;
    margin-bottom: 5px;
    align-items: center;
  }
  .overview {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
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

  return (
    <Row gutter={[16, 16]}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <InfoCard
            hoverable
            cover={
              movie.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  width={300}
                  height={170}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              ) : (
                <div style={{ textAlign: "center", padding: "75px 0" }}>
                  <h1>Oops!</h1>
                  <p>There is no backdrop image for this movie.</p>
                </div>
              )
            }
          >
            <InfoMeta
              title={movie.title}
              description={
                <Description>
                  <span>{movie.release_date}</span>
                  <span>
                    <Rate rate={movie.vote_average} /> &nbsp; (
                    {movie.vote_count})
                  </span>
                  <span className="overview"> {movie.overview} </span>
                </Description>
              }
            />
          </InfoCard>
        </Col>
      ))}
    </Row>
  );
};

export default MovieGrid;
