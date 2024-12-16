import React from "react";
import styled from "styled-components";

const TrailerSection = styled.div`
  margin-top: 30px;
`;

const TrailerTitle = styled.h2`
  margin-bottom: 10px;
`;

const TrailerContainer = styled.div`
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  background: #000;
`;

interface TrailerProps {
  trailerKey: string | null;
}

const Trailer: React.FC<TrailerProps> = ({ trailerKey }) => {
  if (!trailerKey) return null;

  return (
    <TrailerSection>
      <TrailerTitle>官方預告片</TrailerTitle>
      <TrailerContainer>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </TrailerContainer>
    </TrailerSection>
  );
};

export default Trailer;
