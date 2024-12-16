"use client";

import React from "react";
import { Modal, Button, Space } from "antd";
import styled from "styled-components";
import { Movie } from "@/types/movie";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import Rate from "@/components/Rate";

const MoveTitle = styled.h2`
  margin-bottom: 15px;
`;

const MovieInfoContainer = styled.div`
  & > span {
    display: flex;
    margin-bottom: 5px;
    align-items: center;
  }

  p {
    line-height: 1.5;
  }

  .actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  position: relative;
`;

interface MovieDetailModalProps {
  visible: boolean;
  movie: Movie | null;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  visible,
  movie,
  onClose,
}) => {
  if (!movie) return null;
  console.log(movie);

  return (
    <Modal
      title={<MoveTitle>{movie.title}</MoveTitle>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
    >
      <MovieInfoContainer>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <span>
          <Rate rate={movie.vote_average} /> &nbsp; ({movie.vote_count})
        </span>

        <p>{movie.overview}</p>
        <Space className="actions">
          <Button icon={<BookOutlined />} type="primary">
            加入待看清單
          </Button>
          <Link href={`/movie/${movie.id}`}>
            <Button icon={<InfoCircleOutlined />}>前往詳細頁面</Button>
          </Link>
        </Space>
      </MovieInfoContainer>
    </Modal>
  );
};

export default MovieDetailModal;
