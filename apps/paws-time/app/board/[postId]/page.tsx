import { Body } from "./body";

const BoardDetailPage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = await params; // postId만 사용

  console.log({ postId });

  return (
    <div style={styles.container}>
      <Body postId={postId} />
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
