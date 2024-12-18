"use client";
import React, { useEffect, useState } from "react";
import { styles } from "./page";

interface PostData {
  board_id: string;
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const Body = ({ postId }: { postId: string }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        // JSON Server의 API 호출
        const response = await fetch(`http://localhost:3001/posts/${postId}`);

        if (!response.ok) throw new Error("Failed to fetch post data");

        const data: PostData = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <div style={styles.contentBox}>
      {/* 이미지 영역 */}
      <div style={styles.imagePlaceholder}>
        {/* 이미지 URL이 있다면 여기에 삽입 */}
        이미지 영역
      </div>

      {/* 제목 및 작성일 */}
      <div style={styles.titleBox}>
        <h2 style={styles.title}>{post.title}</h2>
        <span style={styles.date}>
          작성일: {new Date(post.created_at).toLocaleDateString()} | 수정일:{" "}
          {new Date(post.updated_at).toLocaleDateString()}
        </span>
      </div>

      {/* 게시글 내용 */}
      <div style={styles.textBox}>
        <p>{post.content}</p>
      </div>
    </div>
  );
};
