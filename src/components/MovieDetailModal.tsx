"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Modal, Button, Space, message } from "antd";
import styled from "styled-components";
import { Movie } from "@/types/movie";
import { BookOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import Rate from "@/components/Rate";
import { addToWatchlist, removeFromWatchlist } from "@/api/tmdb";

const MoveTitle = styled.h2`
  margin-bottom: 5px;
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

const BackdropImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  position: relative;
`;

interface MovieDetailModalProps {
  visible: boolean;
  movie: Movie | null;
  onClose: () => void;
  onChangeHandler?: () => Promise<void>;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  visible,
  movie,
  onClose,
  onChangeHandler,
}) => {
  const pathname = usePathname();
  const isWatchlistPage = pathname === "/watchlist";
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = React.useState(false);

  if (!movie) return null;

  const handleAddToWatchlist = async () => {
    try {
      setLoading(true);
      await addToWatchlist(movie.id);
      if (onChangeHandler) {
        await onChangeHandler();
      }
      onClose();
      messageApi.success("已加入待看清單");
    } catch {
      messageApi.error("加入待看清單失敗");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      setLoading(true);
      await removeFromWatchlist(movie.id);
      if (onChangeHandler) {
        await onChangeHandler();
      }
      onClose();
      messageApi.success("已從待看清單移除");
    } catch {
      messageApi.error("從待看清單移除失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <>
            <MoveTitle>{movie.title}</MoveTitle>
            <Space className="actions">
              {isWatchlistPage ? (
                <Button
                  loading={loading}
                  onClick={handleRemoveFromWatchlist}
                  icon={<BookOutlined />}
                  danger
                >
                  從待看清單移除
                </Button>
              ) : (
                <Button
                  loading={loading}
                  onClick={handleAddToWatchlist}
                  icon={<BookOutlined />}
                  type="primary"
                >
                  加入待看清單
                </Button>
              )}
              <Link href={`/movie/${movie.id}`}>
                <Button icon={<InfoCircleOutlined />}>前往詳細頁面</Button>
              </Link>
            </Space>
          </>
        }
        open={visible}
        onCancel={onClose}
        footer={null}
        width={1200}
        style={{ top: 20 }}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <MovieInfoContainer>
          {movie.backdrop_path ? (
            <BackdropImage
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "75px 0" }}>
              <h1>Oops!</h1>
              <p>There is no backdrop image for this movie.</p>
            </div>
          )}
          <span>
            <Rate rate={movie.vote_average} /> &nbsp; ({movie.vote_count})
          </span>
          <span>{movie.release_date}</span>
          <p>{movie.overview}</p>
        </MovieInfoContainer>
      </Modal>
    </>
  );
};

export default MovieDetailModal;
