export enum Direction {
  DESC = "DESC",
  ASC = "ASC",
}
export const directionDescription: Record<Direction, string> = {
  [Direction.DESC]: "최신순",
  [Direction.ASC]: "오래된순",
};
