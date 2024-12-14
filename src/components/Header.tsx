"use client";

import React, { useState, JSX } from "react";
import styled from "styled-components";
import { Drawer, Button, Menu } from "antd";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import type { MenuProps } from "antd";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 60px;
`;

const NavContainer = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  margin: 0 15px;
  font-size: 1.4rem;
`;

const MobileMenuButton = styled(Button)`
  display: none;
  margin-left: auto;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
`;

const StyledMenu = styled(Menu)`
  background: transparent;
  border: none;
  .ant-menu-item {
    font-size: 1.2rem;
  }
`;

const SearchButton = styled(Button)<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "inline-flex")};
`;

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const hideSearch = pathname === "/search";

  const items: MenuProps["items"] = [
    {
      key: "home",
      label: (
        <Link href="/" onClick={() => setDrawerOpen(false)}>
          首頁
        </Link>
      ),
    },
    {
      key: "popular",
      label: (
        <Link href="/popular" onClick={() => setDrawerOpen(false)}>
          熱門電影
        </Link>
      ),
    },
    {
      key: "now_playing",
      label: (
        <Link href="/now-playing" onClick={() => setDrawerOpen(false)}>
          新上映
        </Link>
      ),
    },
    {
      key: "watchlist",
      label: (
        <Link href="/watchlist" onClick={() => setDrawerOpen(false)}>
          待看清單
        </Link>
      ),
    },
  ];

  const openSearch = () => {
    router.push("/search");
  };

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <Image src={"/icon.svg"} alt="logo" width={60} height={40} />
        </Link>
        <NavContainer>
          {items.map((item) => {
            if (item && "label" in item) {
              const labelElement = item.label as JSX.Element;
              return (
                <NavItem key={item.key} href={labelElement.props.href}>
                  {labelElement.props.children}
                </NavItem>
              );
            }
            return null;
          })}
        </NavContainer>

        <MobileMenuButton
          type="text"
          size="large"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
        />

        <SearchButton
          type="text"
          icon={<SearchOutlined />}
          size="large"
          onClick={openSearch}
          hidden={hideSearch}
        />
      </HeaderContainer>
      <Drawer
        title={
          <DrawerHeader>
            選單
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setDrawerOpen(false)}
            />
          </DrawerHeader>
        }
        placement="right"
        closable={false}
        open={drawerOpen}
      >
        <StyledMenu
          mode="vertical"
          items={items.filter((item) => item && "label" in item)}
        />
      </Drawer>
    </>
  );
};

export default Header;
