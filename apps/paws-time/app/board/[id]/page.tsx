"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PostData {
  board_id: string;
  post_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const BoardDetailPage: NextPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("post_id"); // URL에서 post_id 추출

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
    <div style={styles.container}>
      {/* 게시글 메인 콘텐츠 */}
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
    </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
  },
  contentBox: {
    marginBottom: "20px",
  },
  imagePlaceholder: {
    width: "100%",
    height: "300px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  titleBox: {
    marginBottom: "10px",
  },
  title: {
    margin: "0",
  },
  date: {
    color: "#666",
    fontSize: "14px",
  },
  textBox: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
  },
};

export default BoardDetailPage;
