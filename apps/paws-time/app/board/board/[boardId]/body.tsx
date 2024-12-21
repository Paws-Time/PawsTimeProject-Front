"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PostData {
  postId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likesCount: number;
  category: string;
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
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => setPage(0)} style={styles.button}>
          검색
        </button>
      </div>

      <div style={styles.filterContainer}>
        <select
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={styles.select}
        >
          <option value={5}>5개 보기</option>
          <option value={10}>10개 보기</option>
        </select>
        <button onClick={() => setSort("createdAt,desc")} style={styles.button}>
          최신순
        </button>
        <button onClick={() => setSort("createdAt,asc")} style={styles.button}>
          오래된순
        </button>
      </div>

      <div style={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={styles.button}
        >
          이전
        </button>
        <span>페이지 {page + 1}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={styles.button}
        >
          다음
        </button>
      </div>

      <ul style={styles.postList}>
        {posts.map((post) => (
          <li
            key={post.postId}
            style={styles.postItem}
            onClick={() => router.push(`/board/${boardId}/${post.postId}`)}
          >
            <h2 style={styles.postTitle}>{post.title}</h2>
            <p style={styles.postPreview}>{post.contentPreview}</p>
            <div style={styles.postMeta}>
              <span>조회수: {post.views}</span>
              <span>좋아요: {post.likesCount}</span>
              <span>카테고리: {post.category}</span>
            </div>
          </li>
        ))}
      </ul>
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
  postList: {
    listStyleType: "none" as const,
    padding: 0,
  },
  postItem: {
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  postTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px",
    color: "#007bff",
  },
  postPreview: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  postMeta: {
    fontSize: "12px",
    color: "#888",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default BoardListBody;
