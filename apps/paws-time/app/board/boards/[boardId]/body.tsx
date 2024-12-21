"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/app/components/icons/card";
import { CustomButton } from "@/app/components/icons/button";
import { InputField } from "@/app/components/icons/input";

interface PostData {
  id: number;
  postId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
}

const BoardListBody = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("createdAt,desc");

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://43.200.46.13:8080/post/posts?boardId=${boardId}&keyword=${keyword}&page=${page}&size=${size}&sort=${sort}`
        );
        if (!response.ok) {
          console.error("Failed to fetch posts. Status:", response.status);
          throw new Error("Failed to fetch posts");
        }

        const data: PostData[] = await response.json();
        setPosts(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (boardId) {
      fetchPosts();
    }
  }, [boardId, keyword, page, size, sort]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>게시판 {boardId}의 게시글 목록</h1>
      <div style={styles.filterContainer}>
        <InputField
          label="검색어를 입력하세요"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <CustomButton
          $label="검색"
          $sizeType="normal"
          onClick={() => setPage(0)}
        />
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={styles.select}
        >
          <option value={5}>5개 보기</option>
          <option value={10}>10개 보기</option>
        </select>
        <select
          value={size}
          onChange={(e) => setSort(String(e.target.value))}
          style={styles.select}
        >
          <option value={"desc"}>최신순</option>
          <option value={"createdAt"}>과거순</option>
        </select>
      </div>
      <div style={styles.cardContainer}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            contentPreview={post.contentPreview}
            views={post.views}
            likesCount={post.likesCount}
            onClick={() => router.push(`posts/${post.id}`)}
          />
        ))}
      </div>

      <div style={styles.pagination}>
        <CustomButton
          $label="이전"
          $sizeType="normal"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        />
        <CustomButton
          $label="다음"
          $sizeType="normal"
          onClick={() => setPage((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
};

export default BoardListBody;
