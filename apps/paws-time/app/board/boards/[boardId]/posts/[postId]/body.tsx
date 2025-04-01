"use client";
import React, { useEffect, useState } from "react";
import { postFormStyles } from "@/app/styles/postforms";
import {
  getGetDetailPostQueryKey,
  getGetImagesQueryKey,
  useDeletePost,
  useGetDetailPost,
  useGetImages,
} from "@/app/lib/codegen/hooks/post/post";
import { useParams, useRouter } from "next/navigation";
import Count from "@/components/count";
import Review from "@/components/review";
import { CustomButton } from "@/components/utils/button";
import { useGetCommentByPost } from "@/app/lib/codegen/hooks/comment/comment";
import { GetImageRespDto } from "@/app/lib/codegen/dtos";
import { useQuery } from "@tanstack/react-query";
import { getUserFromUserId } from "@/app/lib/codegen/hooks/user-api/user-api";
import { useAuth } from "@/app/hooks/authStore";
import Image from "next/image";
import { AxiosError } from "axios";

interface PostData {
  postId?: number;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

const PostDetailBody = () => {
  const router = useRouter();
  const { boardId, postId } = useParams();
  const { userId: loggedInUserId, role } = useAuth(); // ✅ 현재 로그인한 사용자 ID 가져오기
  const [curImageNum, setCurImageNum] = useState<number>(0);
  const [post, setPost] = useState<PostData | null>(null);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [postImages, setPostImages] = useState<GetImageRespDto[]>([]);

  // ✅ 게시글 정보 가져오기
  const { data: postData } = useGetDetailPost(Number(postId), {
    query: {
      queryKey: getGetDetailPostQueryKey(Number(postId)),
      staleTime: 0,
      cacheTime: 3000,
    },
  });

  useEffect(() => {
    if (postData?.data) {
      setPost(postData.data);
    }
  }, [postData]);

  // ✅ 게시글 삭제 함수
  const { mutate: deletePost } = useDeletePost({
    mutation: {
      onSuccess: (data) => {
        alert(data.message); // ✅ 백엔드에서 내려준 메시지 출력
        router.push(`/board/boards/${boardId}`);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const message =
          error.response?.data?.message ??
          "게시글 삭제 중 오류가 발생했습니다.";
        alert(message); // ✅ 백엔드에서 내려준 에러 메시지 출력
      },
    },
  });

  const handleDeletePost = (postId: number) => {
    deletePost({ postId });
  };

  const defaultImage = "/noimage.png";

  // ✅ 이미지 가져오기
  const { data: imageData } = useGetImages(Number(postId), {
    query: {
      queryKey: getGetImagesQueryKey(Number(postId)),
      staleTime: 0,
      cacheTime: 0,
    },
  });

  useEffect(() => {
    if (imageData?.data) {
      setPostImages(imageData.data);
    }
  }, [imageData]);

  const imagesUrl = postImages.map((image) => image.imageUrl) || [];

  const imagePrevHandle = () => {
    setCurImageNum((prev) => (prev > 0 ? prev - 1 : imagesUrl.length - 1));
  };

  const { data: commentsData } = useGetCommentByPost(Number(postId));
  useEffect(() => {
    if (commentsData?.data) {
      setCommentsCount(commentsData.data.length);
    }
  }, [commentsData]);

  const imageNextHandle = () => {
    setCurImageNum((prev) => (prev < imagesUrl.length - 1 ? prev + 1 : 0));
  };

  // ✅ 게시글 작성자의 닉네임 가져오기
  const userId = post?.userId;

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => (userId ? getUserFromUserId(userId) : Promise.resolve(null)),
    enabled: !!userId,
  });

  const authorNick = userData?.data?.nick ?? "알 수 없음";

  const isOwner = loggedInUserId === post?.userId; // ✅ 로그인한 유저가 게시글의 작성자인지 확인
  const isAdmin = role === "ADMIN";

  return (
    <div style={postFormStyles.container}>
      <div style={postFormStyles.imageButtonSection}>
        <div style={postFormStyles.imageSection}>
          {imagesUrl.length > 1 && (
            <CustomButton
              $label="◀"
              $sizeType="mini"
              onClick={imagePrevHandle}
            />
          )}

          {/* <img
            src={imagesUrl[curImageNum] || defaultImage}
            alt="게시글 이미지"
            className="w-[650px] h-[550px]"
          /> */}
          <Image
            src={imagesUrl[curImageNum] || defaultImage}
            alt="게시글 이미지"
            width={650} // 원래 설정된 크기
            height={550}
            className="w-[650px] h-[550px]"
            unoptimized // 외부 URL일 경우 필요 (정적 파일이면 제거 가능)
          />

          {imagesUrl.length > 1 && (
            <CustomButton
              $label="▶"
              $sizeType="mini"
              onClick={imageNextHandle}
            />
          )}
        </div>
        <div style={postFormStyles.buttonBox}>
          <Count
            boardId={Number(boardId)}
            postId={Number(postId)}
            commentsCount={commentsCount}
          />
        </div>
      </div>

      <div style={postFormStyles.contentSection}>
        <div>
          {/* ✅ 본인이 작성한 글만 수정 및 삭제 가능 */}
          {(isOwner || isAdmin) && (
            <div style={postFormStyles.buttonBox}>
              <button
                style={{
                  ...postFormStyles.button,
                  ...postFormStyles.deleteButton,
                }}
                onClick={() => handleDeletePost(Number(postId))}
              >
                삭제
              </button>
              <button
                style={{
                  ...postFormStyles.button,
                  ...postFormStyles.editButton,
                }}
                onClick={() =>
                  router.push(`/board/boards/${boardId}/posts/${postId}/edit`)
                }
              >
                수정
              </button>
            </div>
          )}

          <div
            style={{
              ...postFormStyles.titleBox,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={postFormStyles.title}>{post?.title}</h2>
              <span>
                작성자: {authorNick} | 작성일:{" "}
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "로딩 중입니다."}
              </span>
            </div>

            <button
              onClick={() => router.push(`/board/boards/${boardId}`)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f3f3f3",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              목록으로
            </button>
          </div>
          <div style={postFormStyles.textBox}>
            <p>{post?.content}</p>
          </div>
        </div>

        <div style={postFormStyles.textBox}>
          <Review postId={Number(postId)} setCommentsCount={setCommentsCount} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailBody;
