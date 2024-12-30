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
