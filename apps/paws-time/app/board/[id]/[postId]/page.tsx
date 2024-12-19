import { Body } from "./body";

const BoardDetailPage = async ({
  params,
}: {
  params: { id: number; postId: number };
}) => {
  const { id: boardId, postId } = await params; // id는 boardId로, postId는 그대로 사용, await 안 쓰면 warning

  console.log({ boardId, postId });

  const userId = 2; // 임의로 설정, 실제로는 로그인된 사용자 ID로 설정 필요

  return (
    <div style={styles.container}>
      <Body id={postId} userId={userId} />
    </div>
  );
};

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

export default BoardDetailPage;
