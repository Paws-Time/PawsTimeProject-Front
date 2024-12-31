"use client";

import { UpdateBoardReqDto } from "@/app/lib/codegen/dtos";
import {
  deleteBoard,
  useUpdateBoard,
} from "@/app/lib/codegen/hooks/board/board";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBoardBody({}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const { boardId } = useParams();
  console.log(boardId);

  const { mutate, isLoading, isError } = useUpdateBoard({
    mutation: {
      onSuccess: () => {
        alert("게시판이 성공적으로 수정되었습니다!");
        setTitle("");
        setDescription("");
        router.push(`/board`);
      },
      onError: (error) => {
        console.error(error);
        alert("게시판 수정 중 오류가 발생했습니다.");
      },
    },
  });
  const numberBoardId = Number(boardId);

  const handleEditBoard = () => {
    const params: UpdateBoardReqDto = { title, description };
    mutate({ boardId: numberBoardId, data: params });
    console.log(params);
  };

  if (isLoading) {
    return <div>게시판을 수정 중입니다...</div>;
  }

  if (isError) {
    return <div>게시판 수정 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }
  const handleDeleteBoard = () => {
    deleteBoard(numberBoardId);
    router.push(`/board`);
  };
  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form style={formStyles.form} onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-6/7 justify-center items-center ml-16">
          <h1 style={formStyles.heading} className="w-5/6 ml-16">
            게시판 정보수정
          </h1>{" "}
          <div className="w-1/6 ml-5">
            <CustomButton
              $label="삭제"
              $sizeType="normal"
              onClick={handleDeleteBoard}
              className="mb-5"
            />
          </div>
        </div>
        {/* <div style={formStyles.field}>
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
        </div> */}
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
          $label="수정하기"
          $sizeType="long"
          onClick={handleEditBoard}
        />
        {isError && (
          <p style={{ color: "red" }}>게시판 수정 중 오류가 발생했습니다.</p>
        )}
      </form>
    </div>
  );
}
