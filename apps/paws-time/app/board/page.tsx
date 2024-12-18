import { NextPage } from "next";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
}

const BoardPage: NextPage = () => {
  const posts: Post[] = [
    { id: 1, title: "첫 번째 게시글" },
    { id: 2, title: "두 번째 게시글" },
  ];

  return (
    <div>
      <h1>게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* 게시글 상세 페이지로 이동 */}
            <Link href={`/board/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {/* 글 작성 페이지로 이동 */}
      <Link href="/board/write">
        <button>글 작성하기</button>
      </Link>
    </div>
  );
};

export default BoardPage;
