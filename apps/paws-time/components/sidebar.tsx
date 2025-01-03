"use client";

import { useRouter } from "next/navigation";
import { CustomButton } from "./utils/button";
import useSideBarStore from "@/app/hooks/sidebarStore";
import { useAuthStore } from "@/app/hooks/authStore";

export default function Sidebar() {
  const { sideBarState, sideBarActions } = useSideBarStore();
  const { isShow } = sideBarState;
  const { toggleIsShow } = sideBarActions;

  // const [isShow, setShow] = useState(true);
  const router = useRouter();
  const email = useAuthStore((state) => state.email); // Zustand에서 이메일 상태 가져오기
  const clearToken = useAuthStore((state) => state.clearToken);
  const clearEmail = useAuthStore((state) => state.clearEmail);

  const handleLogout = () => {
    if (confirm("정말 로그아웃하시겠습니까?")) {
      clearToken();
      clearEmail();
      router.push("/");
    }
  };

  const menus = [
    { id: 1, path: "/", name: "메인페이지" },
    { id: 2, path: "/board", name: "게시판" },
    { id: 3, path: "/board/createBoard", name: "게시판 작성" },
    { id: 4, path: "/infoboard", name: "장소 게시판" },
    email
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
        top: "80px", // 헤더 아래로 80px 만큼 내려갑니다.
        left: isShow ? 0 : "-300px",
        height: "calc(100% - 80px)", // 전체 화면 높이에서 헤더 높이를 뺍니다.
        width: "300px",
        backgroundColor: "#f8f9fa",
        transition: "left 0.5s ease-in-out",
        boxShadow: "1px 0px 2px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <button
        style={{
          position: "absolute",
          marginTop: "400px",
          top: "10px",
          right: "-15px",
          width: "15px",
          height: "50px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={toggleIsShow}
      >
        {isShow ? "◀" : "▶"}
      </button>
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
                  menu.onClick
                    ? menu.onClick // 로그아웃의 경우 handleLogout 사용
                    : () => router.push(menu.path) // 나머지 메뉴는 path로 이동
                }
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
