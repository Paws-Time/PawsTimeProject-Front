"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetPosts } from "@/app/lib/codegen/hooks/post/post";
import { CustomButton } from "@/components/utils/button";
import { Card } from "@/components/utils/card";
import { useGetBoard } from "@/app/lib/codegen/hooks/board/board";
import { useModalStore } from "@/app/hooks/modalStore";
import SortSetting from "@/components/sortsetting";
import Modal from "@/components/modal";
import useBoardStore from "@/app/hooks/boardStore";
import { useState } from "react";
import { formStyles } from "@/app/styles/forms";

interface PostData {
  id?: number;
  postId?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likesCount?: number;
}

interface GetListPostRespDto {
  id?: number;
  title?: string;
  contentPreview?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likesCount?: number;
}

const BoardDetailBody = () => {
  const router = useRouter();
  const { boardId } = useParams();
  const { openModal } = useModalStore();
  const { boardState } = useBoardStore();
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const { pageSize, sortBy, direction } = boardState;
  const params = {
    boardId: Number(boardId),
    keyword: searchKeyword,
    page: pageNo,
    size: pageSize,
    sort: `${sortBy},${direction}`,
  };

  const { data: boardData } = useGetBoard(Number(boardId));
  const boardTitle = boardData?.data?.title;
  // 게시글 목록 가져오기
  const {
    data: postData,
    isLoading,
    error,
  } = useGetPosts(params, {
    query: {
      staleTime: 0,
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: 게시글을 가져오는 중 문제가 발생했습니다.</div>;

  const posts: PostData[] = (postData?.data || []).map(
    (post: GetListPostRespDto) => ({
      ...post,
      postId: post.id,
    })
  );
  const handleSerarch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(keyword);
  };
  const resetPage = () => {
    setPageNo(0);
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{boardTitle} 게시글</h1>
      <div style={styles.filterContainer}>
        <form style={styles.input} onSubmit={handleSerarch}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="제목을 입력하세요"
            style={formStyles.input}
            required
          />
        </form>
        <CustomButton
          $label="검색설정"
          $sizeType="normal"
          onClick={openModal}
          className="mt-2"
        />
        <Modal>
          <SortSetting />
        </Modal>
      </div>
      <div style={styles.cardContainer}>
        {posts.length > 0 ? (
          posts.map((post: PostData) => (
            <Card
              key={post.id}
              postId={post.id!}
              $title={post.title}
              $contentPreview={post.contentPreview}
              $views={post.views}
              $likeCount={post.likesCount}
              onClick={() =>
                router.push(`/board/boards/${boardId}/posts/${post.id}`)
              }
            />
          ))
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </div>
      <div style={styles.pagination}>
        <CustomButton
          $label="처음으로"
          $sizeType="normal"
          onClick={resetPage}
        />

        <span className="mt-5 ml-20"> 현 페이지입니다 : {pageNo + 1}</span>
        <div className="flex gap-3">
          <CustomButton
            $label="이전"
            $sizeType="normal"
            onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))} // 이전 페이지로 이동
            disabled={pageNo === 0} // 첫 페이지에서는 비활성화
          />
          <CustomButton
            $label="다음"
            $sizeType="normal"
            onClick={() => setPageNo((prev) => prev + 1)} // 다음 페이지로 이동
            disabled={posts.length < pageSize} // 마지막 페이지에서 비활성화
          />
        </div>
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
    gap: "50px",
    marginBottom: "20px",
  },
};

export default BoardDetailBody;
