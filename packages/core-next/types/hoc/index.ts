type Params = { [key: string]: string } | undefined | null;
type SearchParams =
  | {
      [key: string]: string | string[] | undefined | null;
    }
  | undefined;

export type PageProps<P = Params, S = SearchParams> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};
export type PageReturnType =
  | Promise<React.JSX.Element | undefined>
  | React.JSX.Element
  | undefined;

/**
 * #### 2024.12.19 현재 Next.js v15.1.1 기준, 공식문서에서 제공하는 page가 가져야 할 기본 props를 그대로 참조합니다.
 *
 * Next.js v15부터는 `params`와 `searchParams`가 Promise 매개변수로 들어오기 때문에, `page.tsx`에서 `export default`되는 함수가 `async`여야 합니다.
 *
 * @example
 *
    const BoardDetailPage: NextPage<{ id: string }, { postId: string }> = (async ({
      params,
      searchParams
    }) => {
      const boardId = (await params).id;
      const postId = (await searchParams).postId;

      return `${boardId}-${postId}`;
    });
 *
 * @link
 * [Next.js 공식문서 - page](https://nextjs.org/docs/app/api-reference/file-conventions/page)
 */
export type NextPageType<P = PageProps["params"], S = PageProps["searchParams"]> = ({
  params,
  searchParams,
}: {
  params: Promise<P>;
  searchParams: Promise<S>;
}) => PageReturnType;