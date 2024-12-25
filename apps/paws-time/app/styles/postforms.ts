export const postFormStyles = {
  container: {
    display: "grid",
    gridTemplateColumns: "4fr 3fr", // 왼쪽 이미지와 오른쪽 리뷰 영역 비율
    gap: "20px",
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  imageButtonSection: {
    display: "flex",
    flexDirection: "column" as const, // 세로 정렬
    justifyContent: "center", // 중앙 정렬
    alignItems: "center", // 가로 축 중앙 정렬
    gap: "20px", // 요소 간 간격
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    height: "100%",
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    height: "100%",
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
    marginTop: "5px",
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
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
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
};
