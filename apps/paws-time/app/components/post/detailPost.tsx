import { useGetDetailPost } from "@/app/lib/codegen/hooks/post/post";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

interface PostDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
}

function DetailPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  console.log("postId from URL:", postId);

  const {
    data: post,
    isLoading,
    error,
  } = useGetDetailPost<PostDetail>(Number(postId), {
    query: {
      enabled: !!postId,
    },
  });

  console.log("API 호출 URL:", `/post/posts/${postId}`);
  console.log("Post data:", post);
  console.log("Error:", error);

  if (isLoading) {
    return <div>Loading... (postId: {postId})</div>;
  }

  if (error) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return <div>게시글 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      <p>조회수: {post.views}</p>
      <p>좋아요: {post.likesCount}</p>
      <button onClick={() => router.push("/board")}>목록으로 돌아가기</button>
    </div>
  );
}

export default DetailPost;
