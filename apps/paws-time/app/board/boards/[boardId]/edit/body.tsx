"use client";

import { UpdateBoardReqDto } from "@/app/lib/codegen/dtos";
import {
  deleteBoard,
  useGetBoard,
  useUpdateBoard,
} from "@/app/lib/codegen/hooks/board/board";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function EditBoardBody() {
  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const router = useRouter();
  const { boardId } = useParams();
  const numberBoardId = Number(boardId);

  const { data } = useGetBoard(numberBoardId);

  useEffect(() => {
    if (data?.data) {
      setTitle(data?.data?.title || "");
      setDescription(data?.data?.description || "");
    }
  }, [data]);

  // ✅ 게시판 수정 API 호출
  const { mutate, isLoading, isError } = useUpdateBoard({
    mutation: {
      onSuccess: (data) => {
        alert(data.message); // ✅ 백엔드 메시지 출력
        setNewTitle("");
        setNewDescription("");
        router.push(`/board`);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const message = error?.response?.data?.message;
        alert(message);
      },
    },
  });

  const handleEditBoard = () => {
    const params: UpdateBoardReqDto = {
      title: newTitle,
      description: newDescription,
    };
    mutate({ boardId: numberBoardId, data: params });
  };

  // ✅ 게시판 삭제 API 호출
  const handleDeleteBoard = async () => {
    try {
      const response = await deleteBoard(numberBoardId);
      alert(response.message); // ✅ 백엔드 메시지 출력
      router.push(`/board`);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "게시판 삭제 중 오류가 발생했습니다.";
      alert(message);
    }
  }; // * 일반 비동기 에러 처리 -> 이미지 참고

  if (isLoading) {
    return <div>게시판을 수정 중입니다...</div>;
  }

  if (isError) {
    return <div>게시판 수정 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form style={formStyles.form} onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-6/7 justify-center items-center ml-16">
          <h1 style={formStyles.heading} className="w-5/6 ml-16">
            게시판 정보수정
          </h1>
          <div className="w-1/6 ml-5">
            <CustomButton
              $label="삭제"
              $sizeType="normal"
              onClick={handleDeleteBoard}
              className="mb-5"
            />
          </div>
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 이름</label>
          <input
            type="text"
            value={newTitle !== "" ? newTitle : title}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
            required
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 간략소개</label>
          <textarea
            value={newDescription !== "" ? newDescription : description}
            onChange={(e) => setNewDescription(e.target.value)}
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
