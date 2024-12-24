"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./styles.css";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const PostEditBody = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        const response = await fetch(`http://43.200.46.13:8080/post/${postId}`);

        if (!response.ok) {
          console.error("Failed to fetch data. Status:", response.status);
          throw new Error("Failed to fetch post data");
        }

        const data = await response.json();

        const mappedData: PostData = {
          post_id: data.postId,
          title: data.title,
          content: data.content,
          created_at: data.createdAt,
          updated_at: data.updatedAt,
        };

        setPost(mappedData);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleDelete = async () => {
    if (!postId) return;

    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`http://43.200.46.13:8080/post/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete post. Status:", response.status);
        alert("게시글 삭제 중 오류가 발생했습니다.");
        return;
      }

      alert("게시판이 삭제되었습니다.");
      router.push("/board");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

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
        <>
          <div className="titleBox">
            <h2 className="title">{post.title}</h2>
            <span>
              작성일: {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="textBox">
            <p>{post.content}</p>
          </div>
        </>
        <div className="buttonBox">
          <button className="button deleteButton" onClick={handleDelete}>
            삭제
          </button>
          <button
            className="button editButton"
            onClick={() => router.push(`/board/${postId}/edit`)}
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
