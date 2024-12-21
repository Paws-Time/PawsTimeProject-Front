"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PostData {
  postId: number;
  title: string;
  content: string;
  postCategory: string; // 수정 시 고정 값 사용하거나 서버에서 받은 값 유지
}

export function BoardEditBody({ postId }: { postId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // 기존 게시글 로드
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `http://43.200.46.13:8080/post/posts/${postId}`
        );
        if (!response.ok) {
          console.error("Failed to fetch data. Status:", response.status);
          throw new Error("Failed to fetch post data");
        }

        const data: PostData = await response.json();

        // 기존 제목, 내용 상태에 설정
        setTitle(data.title || "");
        setContent(data.content || "");
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
      postCategory: "TECH",
    };

    try {
      const response = await fetch(
        `http://43.200.46.13:8080/post/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        console.error("Failed to update post. Status:", response.status);
        alert("게시글 수정 중 오류가 발생했습니다.");
        return;
      }

      alert("게시글이 성공적으로 수정되었습니다.");
      // 수정 완료 후 상세 보기 페이지 이동
      router.push(`/board/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h2 style={styles.heading}>글 수정하기</h2>
        <div style={styles.field}>
          <label style={styles.label}>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          수정 하기
        </button>
      </form>
    </div>
  );
}

const styles = {
  background: {
    position: "absolute" as const,
    width: "1400px",
    height: "700px",
    borderRadius: "10px",
    backgroundColor: "#19aca4",
    zIndex: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  form: {
    zIndex: 1,
    width: "100%",
    maxWidth: "1200px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    height: "800px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between", // 버튼을 하단으로 위치
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    height: "350px", // 고정 높이 설정
    minHeight: "150px", // 최소 높이 설정
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    lineHeight: "1.5",
    resize: "none", // 크기 조정 방지
  },
  button: {
    marginTop: "auto", // 버튼을 하단으로 밀어냄
    padding: "15px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};
