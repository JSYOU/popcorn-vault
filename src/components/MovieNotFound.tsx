"use client";

import React from "react";
import styled from "styled-components";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

const Container = styled.div`
  margin: 50px 0;
`;

export default function MovieNotFound() {
  const router = useRouter();

  return (
    <Container>
      <Result
        status="404"
        title="找不到電影詳細資料"
        subTitle="很抱歉，我們無法取得該電影的相關資訊。請稍後重試或返回首頁。"
        extra={
          <Button type="primary" onClick={() => router.replace("/")}>
            返回首頁
          </Button>
        }
      />
    </Container>
  );
}
