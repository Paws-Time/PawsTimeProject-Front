stack : next.js 15, tailwind, styled-component

pnpm i or pnpm install

pnpm paws-time:dev or pnpm --filter paws-time dev

pnpm paws-time:codegen
//api 훅관리 업데이트.

배포 : 서비스의 릴리즈 (버전업) => 개발상으로는 브랜치 push === main 브랜치의 최신화

우리는 main 브랜치로 코드가 푸시될 때마다, 새로운 이미지가 빌드되고, 그 빌드된 이미지가 어딘가에 등록되어 있어야 한다.
그런데 이 과정을 자동화하면 편하다 => CI/CD => github action

이미지
=> 통일된 개발/배포 환경을 밀봉하는 환경 그 자체 (*.exe)
=> `Dockerfile` 라는 이름을 가진 파일을 생성

컨테이너
=> 그 이미지를 실행한 것 (프로세스)