import BoardWriteBody from "./body";
import { Suspense } from "react";

const BoardWritePage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BoardWriteBody />
    </Suspense>
  );
};

export default BoardWritePage;
