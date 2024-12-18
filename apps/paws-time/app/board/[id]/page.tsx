"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";

const BoardDetailPage: NextPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 동적 ID 가져오기

  return (
    <div>
      <h1>게시글 상세</h1>
      <p>게시글 ID: {id}</p>
      <p>게시글의 내용이 여기에 표시됩니다.</p>
    </div>
  );
};

export default BoardDetailPage;
