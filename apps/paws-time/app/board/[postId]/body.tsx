"use client";
import { styles } from "./page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleDelete = async () => {
    if (!postId) return;

    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://43.200.46.13:8080/post/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

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
        <button
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
      <div style={styles.textBox}>
        <p>{post.content}</p>
      </div>
    </div>
  );
};
