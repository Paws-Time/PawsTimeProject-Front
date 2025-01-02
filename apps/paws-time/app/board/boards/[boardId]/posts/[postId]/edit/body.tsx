"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formStyles } from "@/app/styles/forms";
import { CustomButton } from "@/components/utils/button";
import {
  useGetDetailPost,
  useGetImages,
  useUpdatePost,
  useUpdatePostImages,
} from "@/app/lib/codegen/hooks/post/post";
import { UpdatePostImagesBody } from "@/app/lib/codegen/dtos";

export function PostEditBody() {
  const router = useRouter();
  const { boardId, postId } = useParams(); //위 주소를 통해 boardid와 postid르 받아온다
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState<{ id?: number; url?: string }[]>(
    []
  ); //받아온 이미지 전체를 저장
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [deleteImage, setDeleteImage] = useState<number[]>([]); //삭제할 이미지 id를 저장
  const [updateImage, setUpdateImage] = useState<UpdatePostImagesBody>({
    newImages: [],
  }); //새로 추ㅏ할 이미지를 저장.

  //게시글 상세조회
  const { data: postData } = useGetDetailPost(Number(postId));
  const { data: imageData } = useGetImages(Number(postId));
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: updatePostImage } = useUpdatePostImages();
  // 게시글 데이터와 이미지 데이터를 상태로 설정
  useEffect(() => {
    if (postData) {
      setTitle(postData?.data?.title || "");
      setContent(postData?.data?.content || "");
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
  // 이미지 변경 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUpdateImage((prev) => ({
        newImages: [...(prev?.newImages || []), ...files], // 이전 이미지와 새 이미지를 병합
      }));
      const newImages = files.map((file) => ({
        id: Date.now(),
        url: URL.createObjectURL(file),
      }));
      setPostImage((prev) => [...prev, ...newImages]);
    }
  };
  // 이미지 삭제 처리
  const handleDeleteImage = (id: number) => {
    setPostImage((prev) => prev.filter((img) => img.id !== id));
    setDeleteImage((prev) => [...prev, id]);
  };

  //게시글 및 이미지 업데이트 핸들러
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    const trimmedContent = newContent.trim();
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

    updatePost({
      postId: Number(postId),
      data: { title: trimmedTitle, content: trimmedContent },
    });

    updatePostImage({
      postId: Number(postId),
      data: { newImages: updateImage?.newImages || [] },
      params: { deletedImageIds: deleteImage },
    });
    //수정 완료
    router.push(`/board/boards/${Number(boardId)}/posts/${Number(postId)}`);
  };

  return (
    <div style={formStyles.container}>
      <div style={formStyles.background}></div>
      <form onSubmit={handleUpdate} style={formStyles.form}>
        <h2 style={formStyles.heading}>글 수정하기</h2>
        <div style={formStyles.field}>
          <label style={formStyles.label}>게시판 : {title}</label>
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>제목</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
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
              {postImage.map((image) => (
                <div key={image.id} style={formStyles.imagePreview}>
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
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full" style={formStyles.posttextarea}>
            <label style={formStyles.label}>내용</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={content || "내용을 입력하세요"}
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
