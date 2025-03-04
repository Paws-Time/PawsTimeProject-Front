"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuthStore } from "@/app/hooks/authStore";
import useSideBarStore from "@/app/hooks/sidebarStore";
import { useHandleLogout } from "@/app/hooks/logout";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center; /* 로고를 중앙에 배치 */
  height: 60px;
  background-color: #f8f9fa;
  padding: 0 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BrandLogo = styled.div`
  text-decoration: none;
  font-weight: bold;
  color: #222222;
  cursor: pointer;

  @font-face {
    font-family: "TTHakgyoansimMabeopsaR";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/insungitCutelivelyjisu.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  p {
    margin: 0;
    font-size: 50px;
    font-family: "TTHakgyoansimMabeopsaR";
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  left: 10px; /* 헤더의 왼쪽 상단에 고정 */
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.div`
  position: absolute;
  right: 20px; /* 헤더의 오른쪽 상단에 고정 */
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Header() {
  const router = useRouter();
  const { sideBarActions } = useSideBarStore();
  const { toggleIsShow } = sideBarActions;

  const nick = useAuthStore((state) => state.nick); // email 대신 nick 사용
  const restoreState = useAuthStore((state) => state.restoreState);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    restoreState();
  }, []);

  const handleLoginNavigation = () => {
    router.push("/auth/login");
  };

  const handleMypageNavigation = () => {
    router.push("/mypage");
  };

  return (
    <HeaderContainer>
      {/* 사이드바 토글 버튼 */}
      <ToggleButton onClick={toggleIsShow}>☰</ToggleButton>

      {/* 브랜드 로고 */}
      <BrandLogo
        onClick={() => {
          router.push("/");
          router.refresh();
        }}
      >
        <p>PAWS TIME</p>
      </BrandLogo>

      {/* 사용자 정보 */}
      <UserInfo>
        {" "}
        {/* 🔹 강제 리렌더링을 위한 key 설정 */}
        {nick ? ( // email 대신 nick을 확인
          <>
            <p
              className="text-sm text-neutral-950 cursor-pointer"
              onClick={handleMypageNavigation}
            >
              {nick} {/* email 대신 nick 표시 */}
            </p>
            <button
              className="text-xs text-red-500 underline"
              onClick={handleLogout} // 🔹 변경된 handleLogout 사용
            >
              로그아웃
            </button>
          </>
        ) : (
          <p
            className="text-xs text-blue-500 underline cursor-pointer"
            onClick={handleLoginNavigation}
          >
            로그인
          </p>
        )}
      </UserInfo>
    </HeaderContainer>
  );
}
