"use client";

import { useGetBoardList } from "@/app/lib/codegen/hooks/board/board";
import { useCreatePost } from "@/app/lib/codegen/hooks/post/post";
import React, { useEffect, useState } from "react";

interface BoardResDto {
  boardId: number;
  title: string;
}

interface PostReqDto {
  title: string;
  content: string;
  boardId: number;
  likesCount: number;
}

const BoardWriteBody = () => {
  const [boardId, setBoardId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [boardOption, setBoardOption] = useState<BoardResDto[]>([]);

  const { data } = useGetBoardList();

  useEffect(() => {
    if (data) {
      const boardList =
        data.data?.map((board: any) => ({
          boardId: board.boardId,
          title: board.title,
        })) || [];
      setBoardOption(boardList);
    }
  }, [data]);

  const { mutate, isLoading, isError } = useCreatePost({
    mutation: {
      onSuccess: () => {
        alert("게시글이 성공적으로 생성되었습니다.");
        setTitle("");
        setContent("");
      },
      onError: (error) => {
        console.error(error);
        alert("게시글 생성 중 오류가 발생했습니다.");
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length < 5 || trimmedTitle.length > 20) {
      alert("제목은 5자 이상 20자 이하로 작성해주세요.");
      return;
    }

    if (trimmedContent.length < 5) {
      alert("내용은 최소 5자 이상이어야 합니다.");
      return;
    }

    const postData: PostReqDto = {
      title: trimmedTitle,
      content: trimmedContent,
      boardId: boardId,
      likesCount: 0,
    };

    mutate({ data: postData });
  };

  if (isLoading) {
    return <div>게시글을 생성 중입니다...</div>;
  }

  if (isError) {
    return <div>게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>글 작성하기</h2>
        <div style={styles.field}>
          <label style={styles.label}>게시판</label>
          <select
            value={boardId}
            onChange={(e) => setBoardId(Number(e.target.value))}
            style={styles.select}
          >
            {boardOption.map((board) => (
              <option key={board.boardId} value={board.boardId}>
                {board.title}
              </option>
            ))}
          </select>
        </div>
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
          작성하기
        </button>
      </form>
    </div>
  );
};

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
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    height: "800px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold" as const,
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
    height: "350px",
    minHeight: "150px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
    lineHeight: "1.5",
    resize: "none" as const,
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
    backgroundColor: "#fff",
    appearance: "none" as const, // 기본 화살표 제거
  },
  button: {
    marginTop: "auto",
    width: "100%",
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

export default BoardWriteBody;
