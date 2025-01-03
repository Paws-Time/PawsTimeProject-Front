//정렬방향
export enum Direction {
  DESC = "DESC",
  ASC = "ASC",
}
export const directionDescription: Record<Direction, string> = {
  [Direction.DESC]: "▼",
  [Direction.ASC]: "▲",
};
export const directionBoardDescription: Record<Direction, string> = {
  [Direction.DESC]: "최신순",
  [Direction.ASC]: "오래된순",
};
//정렬기준(post)
export enum SortBy {
  TITLE = "title",
  CREATED_AT = "createdAt",
  LIKES_COUNT = "likesCount",
  VIEWS = "views",
}

export const sortByDescription: Record<SortBy, string> = {
  [SortBy.TITLE]: "제목",
  [SortBy.CREATED_AT]: "작성일",
  [SortBy.VIEWS]: "조회",
  [SortBy.LIKES_COUNT]: "좋아요",
};

export enum BoardType {
  GENERAL = 1,
  INFO = 2,
}

export const boardTypeDescription: Record<BoardType, string> = {
  [BoardType.GENERAL]: "일반 게시판",
  [BoardType.INFO]: "정보 게시판",
};
