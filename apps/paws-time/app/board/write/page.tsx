"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const BoardWritePage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, content }); // 작성한 데이터를 서버로 전송하는 로직 추가
    alert("글 작성 완료!");
    router.push("/board");
  };

  return (
    <div>
      <h1>글 작성하기</h1>
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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default BoardWritePage;
