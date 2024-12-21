"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const BoardWriteBody = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardId, setBoardId] = useState(1); // 기본값 1로 설정
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // boardId에 따라 category 결정
    const categoryMap: Record<number, string> = {
      1: "TECH",
      2: "EDUCATION",
      3: "LIFESTYLE",
      4: "ENTERTAINMENT",
    };

    const category = categoryMap[boardId] || "OTHER"; // boardId가 없으면 기본값 "OTHER"

    // 서버에 보낼 데이터
    const postData = {
      title: title,
      content: content,
      boardId: boardId,
      category: category,
      likesCount: 0, // 임의 값 고정
    };

    try {
      const response = await fetch("http://43.200.46.13:8080/post/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("글 작성 완료!");
        router.push("/board");
      } else {
        throw new Error("게시글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>게시판 선택:</label>
        <select
          value={boardId}
          onChange={(e) => setBoardId(Number(e.target.value))}
          required
        >
          <option value={1}>TECH</option>
          <option value={2}>EDUCATION</option>
          <option value={3}>LIFESTYLE</option>
          <option value={4}>ENTERTAINMENT</option>
        </select>
      </div>
      <div>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>내용:</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
};
