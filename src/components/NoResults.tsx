import React from "react";
import { Empty } from "antd";
import styled from "styled-components";

const NoResultsContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const NoResults: React.FC = () => {
  return (
    <NoResultsContainer>
      <Empty description="找不到相關的電影" />
    </NoResultsContainer>
  );
};

export default NoResults;
