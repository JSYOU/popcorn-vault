import React from "react";
import styled from "styled-components";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto; /
  gap: 16px;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 8px; 
    padding: 8px;
  }
`;

const ActorCard = styled(Card)`
  flex: 0 0 auto;
  width: 120px;
  text-align: center;
  color: white;
  border: none;

  .ant-card-body {
    padding: 12px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;

  svg {
    font-size: 48px;
    color: #aaa;
  }
`;

const ActorName = styled(Text)`
  color: white;
  font-size: 14px;
`;

const ActorCharacter = styled(Text)`
  color: #aaa;
  font-size: 12px;
`;

interface ActorProps {
  name: string;
  character: string;
  profile_path?: string;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w185";

const ActorProfile: React.FC<ActorProps> = ({
  name,
  character,
  profile_path,
}) => {
  const imageUrl = profile_path ? `${BASE_IMAGE_URL}${profile_path}` : null;

  return (
    <ActorCard>
      <ImageContainer>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <UserOutlined />
        )}
      </ImageContainer>
      <ActorName strong>{name}</ActorName>
      <br />
      <ActorCharacter>{character}</ActorCharacter>
    </ActorCard>
  );
};

const ActorList: React.FC<{ actors: ActorProps[] }> = ({ actors }) => {
  return (
    <ScrollContainer>
      {actors.map((actor, index) => (
        <ActorProfile
          key={index}
          name={actor.name}
          character={actor.character}
          profile_path={actor.profile_path}
        />
      ))}
    </ScrollContainer>
  );
};

export default ActorList;
