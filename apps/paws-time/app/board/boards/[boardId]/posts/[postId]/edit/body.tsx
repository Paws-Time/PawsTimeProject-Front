"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formStyles } from "@/app/styles/forms";
import { useGetBoard } from "@/app/lib/codegen/hooks/board/board";
import { CustomButton } from "@/components/utils/button";
import { useUploadImages } from "@/app/lib/codegen/hooks/post/post";
import { UploadImagesBody } from "@/app/lib/codegen/dtos";

interface PostData {
  postId: number;
  title: string;
  content: string;
  postCategory: string; // 수정 시 고정 값 사용하거나 서버에서 받은 값 유지
}
interface ImagePreview {
  file: File;
  url: string;
}
export function PostEditBody() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [boardTitle, setBoardTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { boardId, postId } = useParams();
  const [images, setImages] = useState<ImagePreview[]>([]); // 이미지 파일 배열
  const { data: boardData } = useGetBoard(Number(boardId));

  useEffect(() => {
    if (boardData?.data?.title) {
      setBoardTitle(boardData.data.title);
    }
  }, [boardData]);
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
      if (images.length > 0) {
        const uploadData: UploadImagesBody = {
          images: images.map((image) => image.file),
        };
        const numberPostId = Number(postId);
        uploadImageMutate({ postId: numberPostId, data: uploadData });
      }

      if (!response.ok) {
        console.error("Failed to update post. Status:", response.status);
        alert("게시글 수정 중 오류가 발생했습니다.");
        return;
      }

      alert("게시글이 성공적으로 수정되었습니다.");
      router.push(`/board/boards/${boardId}/posts/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };
  //이미지 작성
  const { mutate: uploadImageMutate } = useUploadImages();
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
        </div>{" "}
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
        <CustomButton $label="수정하기" $sizeType="long" type="submit" />
      </form>
    </div>
  );
}
