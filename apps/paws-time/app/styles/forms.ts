export const formStyles = {
  background: {
    position: "absolute" as const,
    width: "1400px",
    height: "700px",
    borderRadius: "10px",
    backgroundColor: "#19aca4",
    zIndex: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  form: {
    zIndex: 1,
    width: "100%",
    maxWidth: "1200px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    height: "900px",
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "24px",
    marginBottom: "5px",
    color: "#333",
  },
  field: {
    marginBottom: "5px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    height: "350px",
    minHeight: "150px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
    lineHeight: "1.5",
    resize: "none" as const,
  },
  postimagelabel: {
    width: "100%",
    height: "50px",
    minHeight: "50px",
    fontSize: "16px",
    borderRadius: "5px",
    boxSizing: "border-box" as const,
    lineHeight: "1.5",
    resize: "none" as const,
  },
  postimagefield: {
    display: "flex",
    flexDirection: "row" as const, // 가로 정렬
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "flex-start", // 내용물 왼쪽 정렬
    flexWrap: "wrap" as const, // 가로 길이를 넘어가면 줄바꿈
    width: "100%", // 부모 컨테이너 너비 제한
    padding: "10px",
    boxSizing: "border-box" as const,
    gap: "10px", // 이미지와 버튼 사이의 간격
    overflowY: "auto" as const, // 넘치는 내용 숨김
  },
  posttextarea: {
    width: "100%",
    height: "350px",
    minHeight: "150px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
    lineHeight: "1.5",
    resize: "none" as const,
  },
  imagePreview: {
    display: "flex",
    flexDirection: "column" as const, // 버튼을 이미지 아래에 배치
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100px", // 이미지 최대 너비
    gap: "5px", // 이미지와 버튼 사이의 간격
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box" as const,
    backgroundColor: "#fff",
    appearance: "none" as const, // 기본 화살표 제거
  },
  button: {
    marginTop: "auto",
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};
