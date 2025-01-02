"use client";

import { UploadImagesBody } from "@/app/lib/codegen/dtos";
import { useGetBoardList } from "@/app/lib/codegen/hooks/board/board";
import {
  useCreatePost,
  useUploadImages,
} from "@/app/lib/codegen/hooks/post/post";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BoardResDto {
  boardId: number;
  title: string;
}
interface ImagePreview {
  file: File;
  url: string;
}

const BoardWriteBody = () => {
  const [boardId, setBoardId] = useState<number>();
  const [title, setTitle] = useState<string>(""); // 게시글 제목
  const [content, setContent] = useState<string>(""); // 게시글 내용
  const [images, setImages] = useState<ImagePreview[]>([]); // 이미지 파일 배열
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
      onSuccess: async (response) => {
        const newPostId = response.data; // 게시글 ID

        if (images.length > 0) {
          // 이미지 업로드 데이터 준비
          const uploadData: UploadImagesBody = {
            images: images.map((image) => image.file), // Blob[] 형태로 변환
          };

          console.log("Uploading Images with Data:", uploadData);

          try {
            // 이미지 업로드 Mutation 실행
            await new Promise((resolve, reject) => {
              uploadImageMutate(
                { postId: Number(newPostId), data: uploadData },
                {
                  onSuccess: resolve,
                  onError: reject,
                }
              );
            });

            console.log("이미지 업로드 성공");
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
            return; // 이미지 업로드 실패 시 이동하지 않음
          }
        }

        alert("게시글이 성공적으로 생성되었습니다.");
        setTitle(""); // 제목 초기화
        setContent(""); // 내용 초기화
        setImages([]); // 이미지 초기화

        // 이미지 업로드 완료 후 페이지 이동
        router.push(`/board/boards/${boardId}`);
      },
      onError: (error) => {
        console.error("Error response:", error.response?.data || error.message);
        alert("게시글 생성 중 오류가 발생했습니다.");
      },
    },
  });
  // 게시글 작성 핸들러
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

    if (trimmedContent.length < 5 || trimmedContent.length > 250) {
      alert("내용은 최소 5자 이상 250자 이하로 작성해주세요.");
      return;
    }

    const data = {
      data: {
        boardId: boardId || 1,
        title: trimmedTitle,
        content: trimmedContent,
        likesCount: 0,
      },
    };
    mutate(data);
  };
  //이미지 작성
  const { mutate: uploadImageMutate } = useUploadImages({
    mutation: {
      onSuccess: () => {
        console.log("이미지 업로드 완");
      },
    },
  });

  // images: images.map((image) => image.file as Blob),

  if (boardLoading || isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>게시글 생성 중 오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // 파일 객체 배열로 변환
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), //이미지를 url 주소 생성하는 메서드
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); // 상태에 저장
  };

  //이미지 삭제 핸들러
  const handleRemoveImage = (url: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.url !== url));
  };

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
              onChange={handleImageChange}
              multiple
              style={formStyles.postimagelabel}
            />
            <div style={formStyles.postimagefield}>
              {images.map((image) => (
                <div key={image.url} style={formStyles.imagePreview}>
                  <img
                    src={image.url}
                    alt="미리보기"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.url)}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
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
