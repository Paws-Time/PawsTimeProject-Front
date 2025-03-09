# 📌 Paws Time

## 📖 목차
- [🐾 프로젝트 소개](#-프로젝트-소개)
- [👥 팀원 소개](#-팀원-소개)
- [🤝 협업 방식](#-협업-방식)
- [⚡프로젝트 아키텍처 및 기술적 특징](#프로젝트-아키텍처-및-기술적-특징)
- [🔍 브랜치 전략](#-브랜치-전략)
- [✔ 컨벤션](#-컨벤션)
- [⚙ 배포](#-배포)
- [🛠 개발 도구](#-개발-도구)
- [📄 API 명세서 및 ERD 설계도](#-api-명세서-및-erd-설계도)
- [📡 응답구조](#-응답구조)
- [📋 메뉴 구조도](#-메뉴-구조도)
- [🖥 화면 구현](#-화면-구현)

--

## 프로젝트 구조
PAWS-TIME/
├── .github/
│   └── workflows/
│       └── docker-image.yml
├── .vscode/
│   └── settings.json
├── apps/
│   ├── paws-time/
│   └── node_modules/
├── packages/
│   ├── design-system/
│   └── util/
├── .gitignore
├── Dockerfile.paws-time
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md

### 주요 구조설명.
- **apps 폴더**
  - 프로젝트 생성.
- **로컬 package.json**
  - 실행명령어 script 작성
- **package 폴더**
  - 회사, 또는 부서 공용 디자인시스템, 컴포넌트, 버튼 등 기능 생성 공유
 
### 실행 명령어.
    "paws-time:dev": "pnpm --filter paws-time dev",
    "paws-time:build": "pnpm --filter paws-time build",
    "paws-time:start": "pnpm --filter paws-time start",
    "paws-time:lint": "pnpm --filter paws-time lint",
    "paws-time:codegen": "pnpm --filter paws-time codegen",  :백엔드 api 업데이트시 명령어 실행

## ⚡프로젝트 아키텍처 및 기술적 특징


### 📁 모노레포(협업)시스템 적용

이 프로젝트는 레포지토리 관리, 버전 관리 최적화 회사내 프로젝트 관리를 가정하여 package 폴더관리, apps를 통한 프로젝트 관리를 시행하였습니다.

### 📁 모노레포(협업)시스템 사용 이유와 장점
- **일관된 코드베이스 관리**
  - 모든 프로젝트와 패키지가 한 레포지토리에 존재하기 때문에, 코드 스타일, 린팅, 포맷팅 등을 통일성 있게 관리
- **공유된 패키지 및 디자인 시스템**
  - packages 폴더에 공통 모듈(예: 디자인 시스템, 유틸리티 함수 등)을 두어 모든 앱에서 동일한 기준으로 사용할 수 있어 중복 코드를 최소화
- **버전 관리 효율화**
  - 모든 코드가 한 레포지토리에 있으므로, 하나의 커밋이나 태그로 여러 프로젝트의 변경사항을 추적하고 버전 관리를 단순화
- **의존성 관리 최적화**
  - 여러 프로젝트에서 동일한 패키지를 사용할 경우, 모노레포는 중복 설치를 방지하고 의존성을 중앙 집중적으로 관리
- **배포관리 효율화**
  - 여러 프로젝트 간 상호 작용을 단일 레포지토리에서 바로 테스트할 수 있어, 통합 테스트 및 배포 과정에서 신뢰성을 높임
  - 여러 프로젝트를 동시에 배포하거나, 변경된 부분만 선택적으로 배포할 수 있어 빌드 및 테스트 시간이 단축
- **협업 강화**
  - 부서별 프로젝트가 apps 폴더에 구성되므로, 팀 간 충돌을 최소화하면서도 공통 리소스를 함께 사용


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)


### 프론트 개발 기술 스택

| **카테고리**        | **기술 스택**        | **설명**                                           |
|---------------------|----------------------|---------------------------------------------------|
| **프로그래밍 언어** | JavaScript, TypeScript  | Props, 타입의 안정성 위해 타입 스크립트 사용 |
| **프레임워크** | Next.js | 빠르고 강력한 기능을 제공하는 React 기반 프레임워크. |
| **스타일링** | styled-components | 컴포넌트 기반의 스타일링을 위한 CSS-in-JS 라이브러리. |
| **상태관리** | zustand  | 전역 상태 관리를 위한 간단하고 가벼운 라이브러리. |
| **데이터패칭** | @tanstack/react-query  | 데이터 패칭 및 캐싱을 위한 강력한 라이브러리. |
| **API** | Axios | RESTful API와의 통신을 위한 HTTP 클라이언트 라이브러리. |
| **API 문서화** | Orval | OpenAPI 기반으로 타입 및 API 자동 생성 도구. |
| **지도 API** | @googlemaps/js-api-loader | Google Maps API를 로드하는 라이브러리. |
| **지도 연동** | @react-google-maps/api | React에서 Google Maps 사용을 위한 라이브러리. |
| **슬라이드기능** | Swiper  | 직관적인 UI를 위한 슬라이드 기능 제공.. |

### 주요 설정 내용

- **Next.js 설정**  
  - next.config.js 설정을 통해 환경 변수 및 커스텀 빌드 설정 적용
  - pages/ 디렉토리 구조 기반 라우팅 시스템 적용
  - SSR 위주의 클라이언트.

- **ESLINT & Prettier**  
  - 코드 품질 유지 및 일관성 있는 포맷을 위한 설정 적용
  - .eslintrc.json 및 .prettierrc 설정 포함

- **Tailwind CSS**  
  - 스타일링을 위한 유틸리티 퍼스트 CSS 프레임워크 적용
  - 자주사용될 크기 tailwind.config.ts spacing 설정하여 명령어 설정.

- **Orval 설정**  
  - pnpm paws-time:codegen 명령어 실행을 통해 업데이트.
  - .env에 schema Url 주소 변경을 통해 해당 swagger 기준 api 명세 자동 api 생성.

- **package.json script 설정**
  - 로컬주소에서 pnpm 명령어 이용을 통해 실행가능.

### 프론트 개발 package.json
| **패키지**           | **버전**            | **설명**                                           |
|---------------------|----------------------|---------------------------------------------------|
| **next** | 15.1.0 | Next.js 기반의 프론트엔드 프레임워크로 SSR 및 CSR 지원. |
| **react** | 19.0.0 | 컴포넌트 기반의 UI 구축을 위한 라이브러리. |
| **react-dom** | 19.0.0 | React 컴포넌트의 DOM 렌더링을 담당. |
| **axios** | 1.7.9 | 비동기 HTTP 통신을 통해 데이터 패칭을 처리. |
| **styled-component** | 6.1.13 | 컴포넌트 단위로 스타일링을 효율적으로 구성하기 위한 도구. |
| **zustand** | 5.0.2 | 단순하고 직관적인 전역 상태 관리 솔루션. |
| **@tanstack/react-query** | 4 | 비동기 데이터 패칭 및 캐싱을 위한 고성능 도구. |
| **@googlemaps/js-api-loader** | 1.16.8 | Google Maps API 로드 최적화 도구. |
| **@react-google-maps/api** | 2.20.5 | React에서 Google Maps를 연동하는 라이브러리. |
| **swiper** | 11.1.15 | 다양한 슬라이드 및 캐러셀 레이아웃을 제공하는 UI 도구. |
| **orval** | 7.3.0 | OpenAPI 스키마 기반의 API 클라이언트 코드 자동 생성 도구. |
| **typescript** | 5 |코드 품질 유지 및 타입 안정성 확보 도구. |
| **prettier** | 3.4.2 | 코드 품질 유지 및 타입 안정성 확보 도구. |
| **eslint** | 9 | 코드 품질 유지 및 타입 안정성 확보 도구. |

## 📋 메뉴 구조도
피그마로 구성한 초기 페이지
![Image](https://github.com/user-attachments/assets/b0b78903-2fa3-4e04-9cb9-06bf319cc7bf)

![Image](https://github.com/user-attachments/assets/36aa4a4c-73bd-4287-bcb5-003cdd409459)

메인 페이지
![Image](https://github.com/user-attachments/assets/6df20ec0-567f-4cf2-96df-0a55e8fb3214)

## 🖥 화면 구현
(화면 UI/UX 관련 설명 및 스크린샷을 첨부하세요.)

