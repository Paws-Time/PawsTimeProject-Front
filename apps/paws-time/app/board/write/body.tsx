'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const BoardWriteBody = () => {
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
