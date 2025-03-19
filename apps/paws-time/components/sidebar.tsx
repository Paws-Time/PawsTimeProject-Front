"use client";

import { useRouter } from "next/navigation";
import { CustomButton } from "./utils/button";
import useSideBarStore from "@/app/hooks/sidebarStore";
import { useAuthStore } from "@/app/hooks/authStore";
import { useHandleLogout } from "@/app/hooks/logout"; // 새로운 훅 가져오기

export default function Sidebar() {
  const { sideBarState } = useSideBarStore();
  const { isShow } = sideBarState;

  const router = useRouter();
  const { nick, role } = useAuthStore(); // role 추가

  const handleLogout = useHandleLogout();

  // 메뉴 배열 (ADMIN이 아닐 경우 "게시판 작성" 메뉴 제거)
  const menus = [
    { id: 1, path: "/", name: "메인페이지" },
    { id: 2, path: "/board", name: "게시판" },
    ...(role === "ADMIN"
      ? [{ id: 3, path: "/board/createBoard", name: "게시판 작성" }]
      : []), // ADMIN만 게시판 작성 가능
    { id: 4, path: "/infoboard/hospital", name: "병원 게시판" },
    { id: 6, path: "/infoboard/shelter", name: "보호소 게시판" },
    nick
      ? { id: 5, path: "#", name: "로그아웃하기", onClick: handleLogout }
      : {
          id: 5,
          path: "/auth/login",
          name: "로그인하기",
          onClick: () => router.push("/auth/login"),
        },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: "60px",
        left: isShow ? 0 : "-300px",
        height: "calc(100% - 60px)",
        width: "300px",
        backgroundColor: "#f8f9fa",
        transition: "left 0.5s ease-in-out",
        boxShadow:
          "1px -1px 5px rgba(0, 0, 0, 0.2), 1px 0px 2px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <nav>
        <ul style={{ padding: "20px 0", listStyleType: "none" }}>
          {menus.map((menu) => (
            <li
              key={menu.id}
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              <CustomButton
                $label={menu.name}
                $sizeType="menu"
                onClick={
                  menu.onClick ? menu.onClick : () => router.push(menu.path)
                }
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
