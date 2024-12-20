"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const BoardWriteBody = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 서버에 보낼 데이터
    const postData = {
      title: title,
      content: content,
      boardId: 1, // 임의 값 고정
      category: "TECH", // 임의 값 고정
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
