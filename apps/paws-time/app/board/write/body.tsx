"use client";

import { CreatePostBody, CreatePostReqDto } from "@/app/lib/codegen/dtos";
import { useGetBoardList } from "@/app/lib/codegen/hooks/board/board";
import { useCreatePost } from "@/app/lib/codegen/hooks/post/post";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BoardResDto {
  boardId: number;
  title: string;
}

const BoardWriteBody = () => {
  const searchParams = useSearchParams();
  const boardIdParam = searchParams.get("boardId"); // URL 쿼리에서 boardId 가져오기
  const [boardId, setBoardId] = useState<number | undefined>(
    Number(boardIdParam) || undefined
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [boardOption, setBoardOption] = useState<BoardResDto[]>([]);
  const router = useRouter();
  const { data, isLoading: boardLoading } = useGetBoardList();

  // 게시판 목록 로드 및 기본값 설정
  useEffect(() => {
    if (data) {
      const boardList =
        data.data?.map((board: any) => ({
          boardId: board.boardId,
          title: board.title,
        })) || [];
      setBoardOption(boardList);

      if (!boardId && boardList.length > 0) {
        setBoardId(boardList[0].boardId); // 첫 번째 게시판을 기본값으로 설정
      }
    }
  }, [data, boardId]);

  const { mutate, isLoading, isError } = useCreatePost({
    mutation: {
      onSuccess: () => {
        alert("게시글이 성공적으로 생성되었습니다.");
        setTitle("");
        setContent("");
        router.push(`/board/boards/${boardId}`); // 게시판 상세 페이지로 이동
      },
      onError: (error) => {
        console.error(error);
        alert("게시글 생성 중 오류가 발생했습니다.");
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
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

    if (!boardId) {
      alert("게시판을 선택해주세요.");
      return;
    }

    const postData: CreatePostReqDto = {
      title: trimmedTitle,
      content: trimmedContent,
      boardId: boardId,
      likesCount: 0,
    };
    const requestBody: CreatePostBody = {
      data: postData,
      images: undefined,
    };

    mutate({ data: requestBody });
  };

  if (boardLoading || isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <h2 style={formStyles.heading}>글 작성하기</h2>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판</label>
          <select
            value={boardId}
            onChange={(e) => setBoardId(Number(e.target.value))}
            style={formStyles.select}
            required
          >
            {boardOption.map((board) => (
              <option key={board.boardId} value={board.boardId}>
                {board.title}
              </option>
            ))}
          </select>
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            style={formStyles.textarea}
            required
          />
        </div>
        <CustomButton $label="작성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default BoardWriteBody;
