"use client";

import { CreatePostBody } from "@/app/lib/codegen/dtos";
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
  const [title, setTitle] = useState<string>(""); // 게시글 제목
  const [content, setContent] = useState<string>(""); // 게시글 내용
  const [images, setImages] = useState<File[]>([]); // 이미지 파일 배열
  const [boardOption, setBoardOption] = useState<BoardResDto[]>([]);

  const router = useRouter();
  const { data, isLoading: boardLoading } = useGetBoardList();

  // 게시판 목록 로드
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
        setTitle(""); // 제목 초기화
        setContent(""); // 내용 초기화
        setImages([]); // 이미지 초기화
        router.push(`/board/boards/${boardId}`); // 게시판 상세 페이지로 이동
      },
      onError: (error) => {
        console.error(error);
        alert("게시글 생성 중 오류가 발생했습니다.");
      },
    },
  });

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // 파일 객체 배열로 변환
    setImages(files); // 상태에 저장
  };

  // 게시글 작성 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    const requestBody: CreatePostBody = {
      data: {
        boardId: boardId,
        title: trimmedTitle,
        content: trimmedContent,
        likesCount: 0,
      },
      images: images.map((image) => image as Blob), // File을 Blob으로 변환
    };

    mutate({ data: requestBody }); // CreatePostBody를 mutate에 전달
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
        <div style={formStyles.field} className="flex">
          <div className="flex flex-col w-full" style={formStyles.posttextarea}>
            <label htmlFor="image" style={formStyles.label}>
              이미지
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange} // 이미지 파일 변경 핸들러
              multiple
              style={formStyles.posttextarea}
            />
          </div>
          <div className="flex flex-col w-full" style={formStyles.posttextarea}>
            <label style={formStyles.label}>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              style={formStyles.posttextarea}
              required
            />
          </div>
        </div>
        <CustomButton $label="작성하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
};

export default BoardWriteBody;
