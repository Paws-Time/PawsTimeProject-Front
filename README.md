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
| **프로그래밍 언어** | Java 17              | 안정성 및 최신 기능을 제공하는 Java 버전 17 사용. |
| **프레임워크**      | Spring Boot          | 빠르고 효율적인 Spring 기반 애플리케이션 개발을 위한 프레임워크. |
| **데이터베이스**    | MySQL                | 관계형 데이터베이스 관리 시스템 (RDBMS).          |
| **서버**            | AWS                  | 클라우드 환경에서 애플리케이션을 배포하고 관리하기 위한 플랫폼. |
| **컨테이너화**      | Docker               | 애플리케이션을 컨테이너화하여 이식성과 확장성을 제공하는 도구. |
| **버전 관리**       | GitHub               | 소스 코드 버전 관리 및 협업을 위한 GitHub 사용. |
| **파일 업로드**     | Spring Multipart     | 파일 업로드 기능 활성화를 위한 Spring의 `multipart` 설정 사용. |
| **API 문서화**      | Springdoc & Swagger  | OpenAPI를 기반으로 Swagger UI를 통한 API 문서화. |
| **JSON Web Token**  | JWT                  | 사용자 인증 및 권한 관리를 위한 JSON Web Token 기반 인증 처리. |
| **AWS S3**          | AWS SDK              | AWS S3와 연동하여 이미지 및 파일 관리.           |
| **보안**            | Spring Security      | Spring 기반 보안 처리 (JWT 인증 및 권한 관리).    |
| **ORM**             | Hibernate, JPA       | 데이터베이스와 객체를 매핑하기 위한 Hibernate 및 JPA 사용. |

### 주요 설정 내용

- **파일 업로드**  
  - 최대 파일 크기 및 요청 크기: 10MB  
  - 멀티파트 처리 활성화 (`spring.servlet.multipart.enabled: true`)

- **AWS S3**  
  - 이미지 저장소를 위한 S3 연동  
  - AWS 액세스 키 및 비밀 키, 리전, 버킷 이름 설정

- **JPA 및 데이터베이스 설정**  
  - `hibernate.ddl-auto: update` - 자동 데이터베이스 스키마 업데이트  
  - `hibernate.dialect: org.hibernate.dialect.MySQL8Dialect` - MySQL 8 버전 사용  
  - `show-sql: true` - SQL 쿼리 로그 출력

- **JWT 설정**  
  - `expiration_time: 86400000` - JWT 만료 시간 설정 (24시간)  
  - `secret.key` - JWT 암호화 키 설정

- **서버 설정**  
  - 서버 포트: 8080

- **Swagger 설정**  
  - Swagger UI 및 OpenAPI 문서화 관련 설정 (`springdoc.override-with-generic-response: false`)



### 📦 build.gradle (Back-end)

| **라이브러리**                                               | **용도**                                      |
|------------------------------------------------------------|---------------------------------------------|
| `org.springframework.boot:spring-boot-starter-web`           | Spring Boot 웹 애플리케이션 시작을 위한 기본 라이브러리 |
| `org.springframework.boot:spring-boot-starter-data-jpa`      | Spring Data JPA를 위한 스타터 라이브러리      |
| `org.springframework.boot:spring-boot-starter-test`         | Spring Boot 테스트를 위한 스타터 라이브러리  |
| `org.springframework.boot:spring-boot-starter-validation`   | Spring Validation을 위한 스타터 라이브러리   |
| `org.springframework.boot:spring-boot-starter-security`     | Spring Security 관련 기능을 위한 스타터 라이브러리 |
| `org.springframework.boot:spring-boot-starter-json`         | JSON 처리 기능을 위한 Spring Boot 스타터 라이브러리 |
| `org.springframework.security:spring-security-core`         | Spring Security 핵심 기능을 위한 라이브러리 |
| `org.springframework.boot:spring-boot-starter-webmvc-ui`    | OpenAPI 문서화 지원을 위한 라이브러리 |
| `org.mybatis.spring.boot:mybatis-spring-boot-starter`      | MyBatis와 Spring Boot 통합을 위한 스타터 라이브러리 |
| `org.mybatis.spring.boot:mybatis-spring-boot-starter-test` | MyBatis 테스트를 위한 스타터 라이브러리 |
| `com.mysql:mysql-connector-j`                               | MySQL 데이터베이스와의 연결을 위한 JDBC 드라이버 |
| `com.amazonaws:aws-java-sdk-s3`                             | AWS S3 서비스와의 연동을 위한 SDK 라이브러리 |
| `io.jsonwebtoken:jjwt-api`                                   | JWT 생성 및 파싱을 위한 API 라이브러리       |
| `io.jsonwebtoken:jjwt-impl`                                  | JWT 구현을 위한 라이브러리                  |
| `io.jsonwebtoken:jjwt-jackson`                               | JWT와 Jackson 통합을 위한 라이브러리        |
| `org.projectlombok:lombok`                                  | 코드 간소화를 위한 Lombok 라이브러리 (Getter, Setter 등) |
| `org.junit.platform:junit-platform-launcher`                | JUnit 테스트 실행을 위한 런처 라이브러리     |
| `com.fasterxml.jackson.core:jackson-databind`               | JSON 직렬화 및 역직렬화를 위한 라이브러리   |




## 📋 메뉴 구조도
(서비스의 메뉴 및 네비게이션 구조를 설명하세요.)

## 🖥 화면 구현
(화면 UI/UX 관련 설명 및 스크린샷을 첨부하세요.)

