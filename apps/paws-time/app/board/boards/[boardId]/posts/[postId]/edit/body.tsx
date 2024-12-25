"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formStyles } from "@/app/styles/forms";
import { useGetBoard } from "@/app/lib/codegen/hooks/board/board";

interface PostData {
  postId: number;
  title: string;
  content: string;
  postCategory: string; // 수정 시 고정 값 사용하거나 서버에서 받은 값 유지
}

export function PostEditBody() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { boardId, postId } = useParams();

  const { data: boardData } = useGetBoard(Number(boardId));

  useEffect(() => {
    if (boardData?.data?.title) {
      setBoardTitle(boardData.data.title);
    }
  }, [boardData]);
  console.log(boardData);
  // 기존 게시글 로드
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://43.200.46.13:8080/post/${postId}`);
        if (!response.ok) {
          console.error("Failed to fetch data. Status:", response.status);
          throw new Error("Failed to fetch post data");
        }

        const data: PostData = await response.json();
        console.log(data);
        setTitle(data.title || ""); // 게시글 제목 설정
        setContent(data.content || ""); // 게시글 내용 설정
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  // 수정 요청
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 앞뒤 공백 제거
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // 빈 문자열 검사
    if (!trimmedTitle) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!trimmedContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 유효성 검사 (제목 5~20자, 내용 5자 이상)
    if (trimmedTitle.length < 5 || trimmedTitle.length > 20) {
      alert("제목은 5자 이상 20자 이하로 작성해주세요.");
      return;
    }
    if (trimmedContent.length < 5) {
      alert("내용은 최소 5자 이상이어야 합니다.");
      return;
    }

    // postCategory는 "TECH"로 고정 예시
    const updatedData = {
      title: trimmedTitle,
      content: trimmedContent,
    };

    try {
      const response = await fetch(`http://43.200.46.13:8080/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        console.error("Failed to update post. Status:", response.status);
        alert("게시글 수정 중 오류가 발생했습니다.");
        return;
      }

      alert("게시글이 성공적으로 수정되었습니다.");
      // 수정 완료 후 상세 보기 페이지 이동
      router.push(`/board/boards/${boardId}/posts/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };
  console.log(title);
  console.log(content);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form onSubmit={handleUpdate} style={formStyles.form}>
        <h2 style={formStyles.heading}>글 수정하기</h2>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 : {boardTitle}</label>
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>제목</label>
          <input
            type="text"
            value={title} // 입력 상태를 newTitle로 변경
            onChange={(e) => setTitle(e.target.value)} // newTitle 상태 업데이트
            placeholder={title || "제목을 입력하세요"}
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>내용</label>
          <textarea
            value={content} // 입력 상태를 newContent로 변경
            onChange={(e) => setContent(e.target.value)} // newContent 상태 업데이트
            placeholder={content || "내용을 입력하세요"}
            style={formStyles.textarea}
            required
          />
        </div>
        <button type="submit" style={formStyles.button}>
          수정 하기
        </button>
      </form>
    </div>
  );
}
