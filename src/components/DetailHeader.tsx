import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import Rate from "@/components/Rate";

const HeaderSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Poster = styled.img`
  width: 300px;
  height: auto;
  border-radius: 10px;
  align-self: center;
`;

const DetailInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const RateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const InfoLine = styled.div`
  margin: 10px 0;
  font-size: 1rem;
`;

const Overview = styled.p`
  font-size: 1.2rem;
`;

interface HeaderProps {
  title: string;
  posterPath: string;
  rate: number;
  voteCount: number;
  director: string | null;
  releaseDate: string;
  overview: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  posterPath,
  rate,
  voteCount,
  director,
  releaseDate,
  overview,
}) => {
  return (
    <HeaderSection>
      <Poster
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
      />
      <DetailInfo>
        <Title>
          {title}
          <Button type="primary" icon={<BookOutlined />} size="large">
            加入待看清單
          </Button>
        </Title>
        <RateBox>
          <span>評分：</span>
          <Rate rate={rate} />
          <span>
            {(rate / 2).toFixed(1)} / 5 ({voteCount})
          </span>
        </RateBox>
        {director && <InfoLine>導演：{director}</InfoLine>}
        <InfoLine>上映日期：{releaseDate}</InfoLine>
        <Overview>{overview}</Overview>
      </DetailInfo>
    </HeaderSection>
  );
};

export default Header;
