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

export const BoardDetailBody = ({ postId }: { postId?: string }) => {
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
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img src="/aaa.jpg" alt="이미지" style={styles.image} />
      </div>
      <div style={styles.contentSection}>
        <div>
          <div style={styles.titleBox}>
            <h2 style={styles.title}>{post.title}</h2>
            <span>
              작성일: {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <div style={styles.textBox}>
            <p>{post.content}</p>
          </div>
        </div>
        <div style={styles.buttonBox}>
          <button
            style={{ ...styles.button, ...styles.deleteButton }}
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            style={{ ...styles.button, ...styles.editButton }}
            onClick={() => router.push(`/board/${postId}/edit`)}
          >
            수정
          </button>
        </div>
      </div>
      <div style={styles.footer}>
        <div style={styles.likesAndComments}>
          <span>좋아요 15</span>
          <span>댓글 6</span>
        </div>
      </div>
      <div style={styles.commentSection}>
        <div style={styles.commentBox}>USER1: 댓글 내용입니다.</div>
        <div style={styles.commentBox}>USER2: 댓글 내용입니다.</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "2fr 3fr", // 왼쪽 이미지와 오른쪽 텍스트 영역 비율
    gap: "20px",
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    height: "300px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  contentSection: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  titleBox: {
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0",
    color: "#333",
  },
  buttonBox: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  textBox: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    padding: "10px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #ddd",
    padding: "10px 0",
    marginTop: "20px",
  },
  likesAndComments: {
    display: "flex",
    gap: "20px",
    fontSize: "16px",
    color: "#555",
  },
  commentSection: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
  },
  commentBox: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
};
