"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Modal, Space } from "antd";
import { GiftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import styled, { keyframes, css } from "styled-components";
import type { Movie } from "@/types/movie";

const shuffleAnimation = keyframes`
  0%, 100% { transform: rotateY(180deg) translate(0, 0) rotate(0deg); }
  50% { transform: rotateY(180deg) translate(0, var(--sy)) rotate(var(--sr)); }
`;

const CardDeck = styled.div`
  width: 300px;
  height: 450px;
  margin-top: 50px;
`;

const Card = styled.div<{ stage?: string; hide?: boolean }>`
  --sx: ${() => Math.random() * 200 - 100}px;
  --sy: ${() => Math.random() * 200 - 100}px;
  --sr: ${() => Math.random() * 60 - 35}deg;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 450px;
  transform-origin: center;
  transform: translate(-50%, -50%);
  perspective: 1000px;

  & > div {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;

    ${({ hide }) =>
      hide &&
      css`
        transform: rotateY(180deg);
        opacity: 0;
      `}

    ${({ stage }) => {
      switch (stage) {
        case "stack":
          return css`
            transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
          `;
        case "flip":
          return css`
            transform: rotateY(180deg);
          `;
        case "shuffle":
          return css`
            animation: ${shuffleAnimation} 0.2s infinite;
          `;
        case "waiting":
          return css`
            transform: rotateY(180deg);
          `;
      }
    }}
  }
`;

const CardFace = styled.div<{ front?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${({ front }) => (front ? "#fff" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: ${({ front }) => (front ? "rotateY(0deg)" : "rotateY(180deg)")};

  ${({ front }) =>
    !front &&
    css`
      background-image: linear-gradient(135deg, #eceff1 25%, transparent 25%),
        linear-gradient(225deg, #eceff1 25%, transparent 25%),
        linear-gradient(45deg, #eceff1 25%, transparent 25%),
        linear-gradient(315deg, #eceff1 25%, #333 25%);
      background-size: 20px 20px;
    `}
`;

const CardComponent = ({
  movie,
  stage,
  onClick,
  hide,
}: {
  movie: Movie;
  stage: string;
  onClick: () => void;
  hide?: boolean;
}) => (
  <Card stage={stage} onClick={onClick} hide={hide}>
    <div>
      <CardFace front>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          width={250}
          height={400}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </CardFace>
      <CardFace />
    </div>
  </Card>
);

function Lottery({ movies }: { movies: Movie[] }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [stage, setStage] = useState<
    "stack" | "flip" | "shuffle" | "waiting" | "choose"
  >("stack");
  const [winner, setWinner] = useState<Movie | null>(null);

  const handleCardClick = useCallback(() => {
    if (stage !== "waiting") return;
    setStage("choose");
  }, [stage]);

  const winnerCard = useCallback(() => {
    if (winner) {
      return (
        <CardComponent
          movie={winner}
          stage={stage}
          hide={stage !== "choose"}
          onClick={handleCardClick}
        />
      );
    }
  }, [winner, stage, handleCardClick]);

  useEffect(() => {
    if (!modalVisible) return;

    setTimeout(() => setStage("flip"), 1500);
    setTimeout(() => setStage("shuffle"), 3000);
    setTimeout(() => setStage("waiting"), 4500);
  }, [modalVisible]);

  const startLottery = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setWinner(movies[randomIndex]);
    setModalVisible(true);
    setStage("stack");
  };

  const disabled = movies.length < 1;

  return (
    <>
      <Button
        disabled={disabled}
        icon={<GiftOutlined />}
        type="primary"
        onClick={startLottery}
      >
        好手氣
      </Button>
      <Modal
        title={
          stage === "choose" ? (
            <Space>
              <h2>{winner?.title}</h2>
              <Link href={`/movie/${winner?.id}`}>
                <Button icon={<InfoCircleOutlined />}>詳細頁面</Button>
              </Link>
            </Space>
          ) : (
            <h2>抽獎中...</h2>
          )
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <CardDeck>
          {movies.slice(0, 10).map((movie) => (
            <CardComponent
              key={movie.id}
              movie={movie}
              stage={stage}
              onClick={() => handleCardClick()}
            />
          ))}
          {winnerCard()}
        </CardDeck>
      </Modal>
    </>
  );
}

export default Lottery;
