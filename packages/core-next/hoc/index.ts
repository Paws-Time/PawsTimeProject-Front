import { NextPageType, PageProps, PageReturnType } from "@/types/hoc";

/**
 * ### HOC (Higher Order Component 고차함수) 패턴으로서, 컴포넌트의 상위에 또다른 컴포넌트를 감싸서 기존 기능을 확장합니다.
 * 
 * 이 NextPage 고차함수는 Next.js가 `page.tsx` 파일에 기본으로 제공하는 `params`와 `searchParams`에 대한 타입을 자동 추론하도록 확장하였습니다.
 * 
 * 또한, 어차피 `page.tsx`의 리액트 컴포넌트는 `export default`되어야 하기 떄문에 굳이 이름이 필요없으므로, 이름을 짓는 불필요한 수고를 덜어줍니다.
 * 
 * @example
 * 
 * import { NextPage } from "core-next/hoc";

  export default NextPage<{ params1: 'foo', params2: 'bar' }, { searchParams1: 'baz', searchParams2: 'qux' }>(async ({
    params,
    searchParams,
  }) => {
    return <h1>Hello World! {(await params).params1} {(await searchParams).searchParams1}</h1>;
  })
 */
export const NextPage = <
  P = PageProps["params"],
  S = PageProps["searchParams"]
>(
  PageComponent: ({
    params,
    searchParams,
  }: {
    params: Promise<P>;
    searchParams: Promise<S>;
  }) => PageReturnType
) => PageComponent as NextPageType;
