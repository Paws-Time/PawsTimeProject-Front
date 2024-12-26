"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchPost, useDeletePost } from "../hooks/postHooks"; // codegen에서 생성된 훅 사용
import "../styles/css/write.css";

const PostDetailBody = () => {
  const router = useRouter();
  const { boardId, postId } = useParams();

  // codegen에서 생성된 React-Query 훅으로 게시글 데이터 가져오기
  const { data: post, isLoading, error } = useFetchPost(postId);

  // codegen에서 생성된 React-Query 훅으로 게시글 삭제
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
      router.push("/board");
    },
    onError: () => {
      alert("게시글 삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDelete = () => {
    if (!postId) return;

    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      deletePost(postId);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !post) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <div className="container">
      <div className="imageSection">
        <img
          src="/aaa.jpg"
          alt="이미지"
          className="w-full h-full object-cover border-r-10"
        />
      </div>
      <div className="contentSection">
        <div>
          <div className="titleBox">
            <h2 className="title">{post.title}</h2>
            <span>
              작성일: {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="textBox">
            <p>{post.content}</p>
          </div>
        </div>
        <div className="buttonBox">
          <button className="button deleteButton" onClick={handleDelete}>
            삭제
          </button>
          <button
            className="button editButton"
            onClick={() =>
              router.push(`/board/boards/${boardId}/posts/${postId}/edit`)
            }
          >
            수정
          </button>
        </div>
      </div>
      <div className="footer">
        <div className="likesAndComments">
          <span>좋아요 15</span>
          <span>댓글 6</span>
        </div>
      </div>
      <div className="commentSection">
        <div className="commentBox">USER1: 댓글 내용입니다.</div>
        <div className="commentBox">USER2: 댓글 내용입니다.</div>
      </div>
    </div>
  );
};

export default PostDetailBody;
