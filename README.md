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


## ⚡프로젝트 아키텍처 및 기술적 특징

### 📁 도메인 주도 설계(DDD : Domain-Driven Design) 적용

이 프로젝트는 도메인 주도 설계 방식을 사용하여 개발되었습니다. <br>DDD를 통해 각 도메인을 독립적으로 관리하고, 비즈니스 로직을 명확하게 분리하여 개발 효율성과 유지보수성을 향상시켰습니다. <br>도메인 모델을 중심으로 HTTP 요청과 응답을 처리하고, 각 레이어의 책임을 분리하여 깔끔하고 확장 가능한 아키텍처를 구현했습니다.

**도메인 기반 패키지 구조**<br>
도메인 주도 설계에 따라 각 도메인 별로 패키지 구조를 분리하여 관리. <br>주요 도메인들은 독립적인 모듈로 관리되며, 각 도메인 내에서 Controller, Facade, Service, DTO, Entity로 구분하여 처리.<br>
![image](https://github.com/user-attachments/assets/d06de74a-edfb-45da-bb6e-f72d93051ed5)
<br>


### 🎯 책임 분리

각 레이어의 책임을 분리하여 코드의 유지보수성과 확장성을 높였습니다.

1. **Controller**: 클라이언트 요청을 처리하고, 응답을 반환하는 역할을 담당합니다.
2. **Service**: 데이터베이스와의 상호작용만 담당하며, DB 조회, 수정, 삭제 등을 처리합니다.
3. **Facade**: 비즈니스 로직과 복잡한 처리를 담당하며, 서비스들 간의 연결 역할을 합니다.


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
## 📋 메뉴 구조도
피그마로 구성한 초기 페이지
![Image](https://github.com/user-attachments/assets/b0b78903-2fa3-4e04-9cb9-06bf319cc7bf)

![Image](https://github.com/user-attachments/assets/36aa4a4c-73bd-4287-bcb5-003cdd409459)

메인 페이지
![Image](https://github.com/user-attachments/assets/6df20ec0-567f-4cf2-96df-0a55e8fb3214)

## 🖥 화면 구현
(화면 UI/UX 관련 설명 및 스크린샷을 첨부하세요.)

