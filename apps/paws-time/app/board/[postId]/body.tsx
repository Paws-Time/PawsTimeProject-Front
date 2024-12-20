"use client";
import React, { useEffect, useState } from "react";
import { styles } from "./page";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const Body = ({ postId }: { postId?: string }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        const response = await fetch(
          `http://43.200.46.13:8080/post/posts/${postId}`
        );

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

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <div style={styles.contentBox}>
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
