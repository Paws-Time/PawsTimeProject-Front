"use client";

import { useRouter } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { InputField } from "@/components/utils/input";
import { CustomButton } from "@/components/utils/button";
import { Card } from "@/components/utils/card";
import usePostStore from "@/app/hooks/postStore";

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

const BoardDetailBody = ({ boardId }: { boardId: number }) => {
  const router = useRouter();
  const { postState, postAction } = usePostStore();
  const { keyword, page, size, sort } = postState;
  const { setKeyword, setPage, setPageSize, setSortBy } = postAction;

  const params = {
    boardId,
    ...(keyword && { keyword }),
    page,
    size,
    sort: sort.replace(",", ","),
  };

  // 게시글 목록 가져오기
  const { data, isLoading, error } = useGetPosts(params, {
    query: {
      staleTime: 5 * 60 * 1000,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  const posts = data?.data || [];
  console.log("Fetched Posts Data:", data);
  console.log("Posts Content:", posts);
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>게시판 {boardId}의 게시글 목록</h1>
      <div style={styles.filterContainer}>
        <InputField
          $label="검색어를 입력하세요"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <CustomButton
          $label="검색"
          $sizeType="normal"
          onClick={() => setPage(0)} // 검색 시 첫 페이지로 이동
        />
        <select
          value={size}
          onChange={(e) => setPageSize(Number(e.target.value) as 3 | 5 | 10)}
          style={styles.select}
        >
          <option value={3}>3개씩 조회</option>
          <option value={5}>5개씩 조회</option>
          <option value={10}>10개씩 조회</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="desc">최신순</option>
          <option value="createdAt">과거순</option>
        </select>
      </div>

      <div style={styles.cardContainer}>
        {posts.length > 0 ? (
          posts.map((post: PostData) => (
            <Card
              key={post.id}
              title={post.title}
              contentPreview={post.contentPreview}
              views={post.views}
              likesCount={post.likesCount}
              onClick={() => router.push(`/board/boards/posts/${post.id}`)}
            />
          ))
        ) : (
          <div style={styles.noData}>게시글이 없습니다.</div>
        )}
      </div>
      <div style={styles.pagination}>
        <CustomButton
          $label="이전"
          $sizeType="normal"
          onClick={() => setPage} // 이전 페이지로 이동
          disabled={page === 0} // 첫 페이지에서는 비활성화
        />
        <CustomButton
          $label="다음"
          $sizeType="normal"
          onClick={() => setPage} // 다음 페이지로 이동
          disabled={page === 0} // 마지막 페이지에서는 비활성화
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

export default BoardDetailBody;
