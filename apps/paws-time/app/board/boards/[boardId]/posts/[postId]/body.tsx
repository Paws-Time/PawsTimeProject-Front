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

interface PostData {
  post_id?: number;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  user_id?: number;
}

const PostDetailBody = () => {
  const router = useRouter();
  const { boardId, postId } = useParams();
  const [curImageNum, setCurImageNum] = useState<number>(0);
  const [post, setPost] = useState<PostData | null>(null);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [newComments, setNewComments] = useState<string>("");
  const [postImages, setPostImages] = useState<GetImageRespDto[]>([]);
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
  const { mutate: deletePost } = useDeletePost({
    mutation: {
      onSuccess: () => {
        alert("게시글이 삭제되었습니다."); // 알림 표시
        router.push(`/board/boards/${boardId}`);
      },
    },
  });
  const handleDeletePost = (postId: number) => {
    deletePost({ postId });
  };
  const defaultImage = "/noimage.png";
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
  }, [commentsData, setNewComments]);

  const imageNextHandle = () => {
    setCurImageNum((prev) => (prev < imagesUrl.length - 1 ? prev + 1 : 0));
  };
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

          <img
            src={imagesUrl[curImageNum] || defaultImage}
            alt=""
            className="w-[650px] h-[550px]"
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
              style={{ ...postFormStyles.button, ...postFormStyles.editButton }}
              onClick={() =>
                router.push(`/board/boards/${boardId}/posts/${postId}/edit`)
              }
            >
              수정
            </button>
          </div>
          <div style={postFormStyles.titleBox}>
            <h2 style={postFormStyles.title}>{post?.title}</h2>
            <span>
              작성자 | 작성일:{" "}
              {post?.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : "로딩 중입니다."}
            </span>
          </div>
          <div style={postFormStyles.textBox}>
            <p>{post?.content}</p>
          </div>{" "}
        </div>

        <div style={postFormStyles.textBox}>
          <Review
            postId={Number(postId)}
            setCommentsCount={setCommentsCount}
            setNewComments={setNewComments}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetailBody;
