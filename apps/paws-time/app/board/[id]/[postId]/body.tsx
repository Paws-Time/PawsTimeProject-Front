"use client";
import React, { useEffect, useState } from "react";
import { styles } from "./page";

interface PostData {
  post_id: number; // 게시글 ID
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const Body = ({ postId }: { postId?: number }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        const response = await fetch(
          `http://43.200.46.13:8080/post/posts/${postId}`
        );

        if (!response.ok) throw new Error("Failed to fetch post data");

        const data = await response.json();

        // 필드 매핑
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

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

  // 게시글 작성자(user_id)가 로그인한 사용자(userId)와 일치하면 수정 가능 표시
  const canEdit = false; // 로그인 확인 로직 없음

  return (
    <div style={styles.contentBox}>
      ㅁ
      <div style={styles.imagePlaceholder}>
        <img
          src="/aaa.jpg"
          alt="보리 이미지"
          style={{
            width: "auto",
            height: "300px",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={styles.titleBox}>
        <h2 style={styles.title}>{post.title}</h2>
        <span style={styles.date}>
          작성일: {new Date(post.created_at).toLocaleDateString()} | 수정일:{" "}
          {new Date(post.updated_at).toLocaleDateString()}
        </span>
      </div>
      <div style={styles.textBox}>
        <p>{post.content}</p>
      </div>
    </div>
  );
};
