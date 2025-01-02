"use client";

import {
  CreateBoardReqDto,
  CreateBoardReqDtoBoardType,
} from "@/app/lib/codegen/dtos";
import { useCreateBoard } from "@/app/lib/codegen/hooks/board/board";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBoardComponent() {
  const [title, setTitle] = useState<string>("");
  const [boardType, setBoardType] =
    useState<CreateBoardReqDtoBoardType>("GENERAL");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const { mutate, isLoading, isError } = useCreateBoard({
    mutation: {
      onSuccess: () => {
        alert("게시판이 성공적으로 생성되었습니다!");
        setTitle("");
        setDescription("");
        router.push(`/board`);
      },
      onError: (error) => {
        console.error(error);
        alert("게시판 생성 중 오류가 발생했습니다.");
      },
    },
  });

  const handleCreateBoard = () => {
    const params: CreateBoardReqDto = { title, description, boardType };
    mutate({ data: params });
  };

  if (isLoading) {
    return <div>게시판을 생성 중입니다...</div>;
  }

  if (isError) {
    return <div>게시판 생성 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form style={formStyles.form} onSubmit={(e) => e.preventDefault()}>
        <h1 style={formStyles.heading}>게시판 만들기</h1>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 유형</label>
          <select
            value={boardType}
            onChange={(e) =>
              setBoardType(e.target.value as CreateBoardReqDtoBoardType)
            }
            style={formStyles.select}
          >
            <option value="GENERAL">일반게시판</option>
            <option value="INFORMATION">정보게시판</option>
          </select>
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 이름</label>
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
          <label style={formStyles.label}>게시판 간략소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="내용을 입력하세요"
            style={formStyles.textarea}
            required
          />
        </div>
        <CustomButton
          $label="저장하기"
          $sizeType="long"
          onClick={handleCreateBoard}
        />
        {isError && (
          <p style={{ color: "red" }}>게시판 생성 중 오류가 발생했습니다.</p>
        )}
      </form>
    </div>
  );
}
