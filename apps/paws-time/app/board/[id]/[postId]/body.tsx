"use client";
import React, { useEffect, useState } from "react";
import { styles } from "./page";

interface PostData {
  id: number; // 게시글 ID
  title: string;
  content: string;
  user_id: number; // 작성자 ID
  board_id: number; // 게시판 ID  ex) 일상 게시판 -> board_id = 1, 리뷰 게시판 -> board_id = 2
  like_count: number;
  is_delete: boolean; // 삭제 여부 확인
  created_at: string;
  updated_at: string;
}

export const Body = ({ id, userId }: { id?: number; userId: number }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;

      try {
        // JSON Server API 호출
        const response = await fetch(
          `http://localhost:4000/posts?id=${id}&user_id=${userId}`
        );
        // userId와 postId를 이용하여 특정 게시글과 관련된 데이터를 필터링

        if (!response.ok) throw new Error("Failed to fetch post data");

        const data: PostData[] = await response.json();
        setPost(data[0]); // 게시글이 하나만 있으므로 첫 번째 항목을 사용
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, userId]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

  // 게시글 작성자(user_id)가 로그인한 사용자(userId)와 일치하면 수정 가능 표시
  const canEdit = post.user_id === userId;

  return (
    <div style={styles.contentBox}>
      <div style={styles.imagePlaceholder}>
        <img
          src="/aaa.jpg"
          alt="보리 이미지"
          style={{
            width: "auto", // 부모 컨테이너의 너비에 맞게 확장
            height: "300px", // 부모 컨테이너의 높이에 맞게 확장
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
