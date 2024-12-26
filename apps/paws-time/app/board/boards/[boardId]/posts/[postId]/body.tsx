"use client";
import React, { useState } from "react";
import { postFormStyles } from "@/app/styles/postforms";
import {
  useDeletePost,
  useGetDetailPost,
} from "@/app/lib/codegen/hooks/post/post";
import { useParams, useRouter } from "next/navigation";
import Count from "@/components/count";
import Review from "@/components/review";

interface PostData {
  post_id?: number;
  title?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

const PostDetailBody = () => {
  const router = useRouter();
  const { boardId, postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const { isLoading, isError } = useGetDetailPost(Number(postId), {
    query: {
      onSuccess: (data) => {
        if (data) {
          setPost({
            post_id: data?.data?.postId,
            title: data?.data?.title,
            content: data?.data?.content,
            created_at: data?.data?.createdAt,
            updated_at: data?.data?.updatedAt,
          });
        }
      },
      onError: () => {
        alert("잘못된 경로입니다.");
        console.log(isError);
      },
    },
  });
  if (isLoading) console.log("로딩중입니다.");
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
  return (
    <div style={postFormStyles.container}>
      <div style={postFormStyles.imageButtonSection}>
        <div style={postFormStyles.imageSection}>
          <img
            src="/aaa.jpg"
            alt="이미지"
            className="w-full h-full object-cover border-r-10"
          />
        </div>
        <div style={postFormStyles.buttonBox}>
          <Count boardId={Number(boardId)} postId={Number(postId)} />
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
              작성일:{" "}
              {post?.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "로딩 중입니다."}
            </span>
          </div>
          <div style={postFormStyles.textBox}>
            <p>{post?.content}</p>
          </div>{" "}
        </div>

        <div style={postFormStyles.textBox}>
          <Review postId={Number(postId)} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailBody;
