import axios from "axios";

const BASE_URL = "http://43.200.46.13:8080";

export const fetchBoards = async (
  pageNo = 0,
  pageSize = 10,
  sortBy = "createdAt",
  direction = "DESC"
) => {
  try {
    const response = await axios.get(`${BASE_URL}/board/list`, {
      params: { pageNo, pageSize, sortBy, direction },
    });
    return response.data.data; // 데이터 리스트 반환
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

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
