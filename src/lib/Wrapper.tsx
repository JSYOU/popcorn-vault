"use client";
import React from "react";
import { ConfigProvider, theme } from "antd";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
