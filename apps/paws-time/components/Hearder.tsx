"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAuthStore } from "@/app/hooks/authStore";

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
    margin-top: 10px;
    font-size: 50px;
    font-family: "TTHakgyoansimMabeopsaR";
  }
`;

export default function Header() {
  const router = useRouter();
  const email = useAuthStore((state) => state.email);
  const restoreState = useAuthStore((state) => state.restoreState);
  const clearToken = useAuthStore((state) => state.clearToken);
  const clearEmail = useAuthStore((state) => state.clearEmail);

  const handleLogout = () => {
    clearToken();
    clearEmail();
    router.push("/auth/login");
  };

  useEffect(() => {
    restoreState(); // 새로고침 시 상태 복원
  }, []);

  const handleLoginNavigation = () => {
    router.push("/auth/login");
  };
  const handleMypageNavigation = () => {
    router.push("/mypage");
  };

  return (
    <header className="flex items-center justify-between w-full h-custom-headerh bg-gray-200 px-6 shadow-md">
      {/* 빈 div로 왼쪽 정렬 확보 */}
      <div className="flex-1"></div>

      {/* 브랜드 로고 - 중앙 정렬 */}
      <BrandLogo onClick={() => router.push("/")}>
        <p className="text-center">PAWS TIME</p>
      </BrandLogo>

      {/* 사용자 정보 - 오른쪽 정렬 */}
      <div className="flex items-center justify-end flex-1 space-x-4">
        {email ? (
          <>
            <p
              className="text-sm text-neutral-950 cursor-pointer"
              onClick={handleMypageNavigation}
            >
              {email}
            </p>
            <button
              className="text-xs text-red-500 underline"
              onClick={handleLogout}
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
      </div>
    </header>
  );
}
