const Base_URL = "http://43.200.46.13:8080/";

interface PostData {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

//게시판 전체보기
export const fetchAll = async () => {
  const response = await fetch(`Base_URL`);
};
