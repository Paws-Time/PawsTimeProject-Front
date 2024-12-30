"use client";

import { CreatePostBody, CreatePostReqDto } from "@/app/lib/codegen/dtos";
import { useGetBoardList } from "@/app/lib/codegen/hooks/board/board";
import { useCreatePost } from "@/app/lib/codegen/hooks/post/post";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BoardResDto {
  boardId: number;
  title: string;
}
const BoardWriteBody = () => {
  const [boardId, setBoardId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [boardOption, setBoardOption] = useState<BoardResDto[]>([]);
  const router = useRouter();

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
        router.push(`/board/boards/${boardId}`);
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

    const postData: CreatePostReqDto = {
      title: trimmedTitle,
      content: trimmedContent,
      boardId: boardId,
      likesCount: 0,
    };
    const requestBody: CreatePostBody = {
      data: postData,
      images: undefined, // 이미지가 없으면 undefined로 설정
    };

    mutate({ data: requestBody });
  };

  if (isLoading) {
    return <div>게시글을 생성 중입니다...</div>;
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
        <div style={formStyles.field}>
          <label style={formStyles.label}>이미지</label>
            <input ></input>
        </div>
        <div></div>
        <CustomButton $label="작성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default BoardWriteBody;
