"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isShow, setShow] = useState(true);
  const router = useRouter();

  const menus = [
    { id: 1, path: "/board", name: "게시판" },
    { id: 2, path: "/board/write", name: "게시글 작성" },
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
          top: "10px",
          right: "-40px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
        onClick={() => setShow(!isShow)}
      >
        {isShow ? "<<" : ">>"}
      </button>
      <nav>
        <ul style={{ padding: "20px 0", listStyleType: "none" }}>
          {menus.map((menu) => (
            <li
              key={menu.id}
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              <button
                style={{
                  width: "90%",
                  padding: "10px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => router.push(menu.path)}
              >
                {menu.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
