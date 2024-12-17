import { Col, Row, Card } from "antd";
import styled from "styled-components";

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

const LoadingGrid = () => {
  return (
    <Row gutter={[16, 16]}>
      {[...Array(6)].map((_, i) => (
        <Col xs={12} sm={8} md={6} lg={4} xl={3} key={i}>
          <InfoCard loading />
        </Col>
      ))}
    </Row>
  );
};

export default LoadingGrid;
