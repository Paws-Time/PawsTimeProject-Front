import { Body } from "./body";
import { NextPage } from 'core-next/hoc'

export default NextPage<{ id: string }, { postId: string }>(async ({
  params,
  searchParams
}) => {
  // const searchParams = useSearchParams();
  // /boardId?postId={}

  // ? paws-time.com/{boardId}/{postId} => 폴더 중첩 필요

  // ? paws-time.com/{boardId}?postId={postId} => 현재 폴더 구조와 동일.
  const boardId = (await params).id;
  const postId = (await searchParams).postId; // URL에서 post_id 추출

  console.log({ boardId, postId });

  return (
    <div style={styles.container}>
      {/* 게시글 메인 콘텐츠 */}
      <Body postId={postId} />
    </div>
  );
});

// 스타일 객체
export const styles = {
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

