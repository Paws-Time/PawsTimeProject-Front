"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import {
  useGetDetailPost,
  useGetImages,
  useUpdatePost,
  useUpdatePostImages,
} from "@/app/lib/codegen/hooks/post/post";
import qs from "qs";
import Image from "next/image";

export function PostEditBody() {
  const { boardId, postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<{ id?: number; url?: string }[]>(
    []
  );
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [deleteImage, setDeleteImage] = useState<number[]>([]); // ✅ 삭제할 이미지 ID 저장
  const [updateImage, setUpdateImage] = useState<Blob[]>([]); // ✅ 추가할 이미지 저장

  // ✅ 게시글 상세 조회
  const { data: postData } = useGetDetailPost(Number(postId));
  const { data: imageData } = useGetImages(Number(postId));
  const { mutate: updatePost } = useUpdatePost();
  // 1. 훅 정의 시 request 옵션에 qs 설정 추가
  const updatePostImage = useUpdatePostImages({
    request: {
      paramsSerializer: (params: Record<string, any>) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    },
  });

  useEffect(() => {
    if (postData?.data) {
      setTitle(postData.data.title || "");
      setContent(postData.data.content || "");
      setNewTitle(postData.data.title || ""); // ✅ 초기값 설정
      setNewContent(postData.data.content || "");
    }
    if (imageData) {
      const images =
        imageData?.data?.map((img) => ({
          id: img.imageId ?? 0,
          url: String(img.imageUrl ?? ""),
        })) || [];
      setPostImage(images);
    }
  }, [postData, imageData]);

  // ✅ 이미지 변경 처리 (새로운 이미지 추가)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUpdateImage((prev) => [...prev, ...files]); // ✅ Blob[] 배열에 추가

      const newImages = files.map((file) => ({
        id: Date.now(),
        url: URL.createObjectURL(file),
      }));
      setPostImage((prev) => [...prev, ...newImages]);
    }
  };

  // ✅ 이미지 삭제 처리 (삭제할 ID 배열에 추가)
  const handleDeleteImage = (id: number) => {
    setPostImage((prev) => prev.filter((img) => img.id !== id));
    setDeleteImage((prev) => [...prev, id]);

    console.log("삭제할 이미지 ID 목록:", [...deleteImage, id]); // ✅ 삭제할 이미지 ID 확인용 로그
  };

  // ✅ 게시글 및 이미지 업데이트 핸들러
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim() || title.trim();
    const trimmedContent = newContent.trim() || content.trim();
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

    console.log("🛠 최종 삭제할 이미지 ID 목록:", deleteImage); // ✅ 삭제할 이미지 ID 확인
    console.log("🛠 추가할 이미지 개수:", updateImage.length);
    // ✅ 게시글 내용 수정
    updatePost({
      postId: Number(postId),
      data: { title: trimmedTitle, content: trimmedContent },
    });

    // 이미지 수정

    updatePostImage.mutate({
      postId: Number(postId),
      data: { newImages: updateImage },
      params: { deletedImageIds: deleteImage },
    });

    // ✅ 수정 완료 후 이동
    location.replace(
      `/board/boards/${Number(boardId)}/posts/${Number(postId)}`
    );
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form onSubmit={handleUpdate} style={formStyles.form}>
        <h2 style={formStyles.heading}>글 수정하기</h2>
        <div style={formStyles.field}>
          <label style={formStyles.label}>제목</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={"제목을 입력하세요"}
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
              {postImage.map((image) => (
                <div key={image.id} style={formStyles.imagePreview}>
                  {image.url && (
                    <Image
                      src={image.url ?? "/default.png"} // undefined 방지
                      alt="미리보기"
                      width={100}
                      height={100}
                      style={{
                        objectFit: "cover",
                        marginBottom: "10px",
                      }}
                      unoptimized // 외부 이미지라면 꼭 필요
                    />
                  )}
                  {image.url && (
                    <button
                      type="button"
                      onClick={() => {
                        if (image.id !== undefined) handleDeleteImage(image.id);
                      }}
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
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full" style={formStyles.posttextarea}>
            <label style={formStyles.label}>내용</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={"내용을 입력하세요"}
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
