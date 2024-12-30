//정렬방향
export enum Direction {
  DESC = "DESC",
  ASC = "ASC",
}
export const directionDescription: Record<Direction, string> = {
  [Direction.DESC]: "내림차순",
  [Direction.ASC]: "오름차순",
};
//정렬기준.
export enum SortBy {
  TITLE = "title",
  LIKES_COUNT = "likesCount",
  VIEWS = "views",
  CREATED_AT = "createdAt",
}

export const sortByDescription: Record<SortBy, string> = {
  [SortBy.TITLE]: "제목",
  [SortBy.LIKES_COUNT]: "좋아요",
  [SortBy.VIEWS]: "조회",
  [SortBy.CREATED_AT]: "작성일",
};

export enum Region {
  SEOUL = 1,
  INCHEON = 2,
  DAEJEON = 3,
  DAEGU = 4,
  GWANGJU = 5,
  BUSAN = 6,
  ULSAN = 7,
  SEJONG = 8,
  GYEONGGI = 9,
  GANGWON = 10,
  CHUNGBUK = 11,
  CHUNGNAM = 12,
  GYEONGBUK = 13,
  GYEONGNAM = 14,
  JEONBUK = 15,
  JEONNAM = 16,
  JEJU = 17,
}

// 지역 설명 Record 객체
export const regionDescription: Record<number, string> = {
  1: "서울",
  2: "인천",
  3: "대전",
  4: "대구",
  5: "광주",
  6: "부산",
  7: "울산",
  8: "세종",
  9: "경기도",
  10: "강원도",
  11: "충청북도",
  12: "충청남도",
  13: "경상북도",
  14: "경상남도",
  15: "전라북도",
  16: "전라남도",
  17: "제주도",
};
