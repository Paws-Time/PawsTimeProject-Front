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



![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![SpringBoot](https://camo.githubusercontent.com/c5c6f5ba41163a05ef0c9aa47053749f7b2da2edaa4df9002af8345adcf8a9f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f737072696e67626f6f742d3644423333463f7374796c653d666f722d7468652d6261646765266c6f676f3d737072696e67626f6f74266c6f676f436f6c6f723d7768697465)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://camo.githubusercontent.com/8e8ac5da5155525bed4d4102a1225ca01bc54b7df3ef0c2711ea6aa6de172d78/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f616d617a6f6e6177732d3233324633453f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e266c6f676f436f6c6f723d7768697465)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![postman](https://camo.githubusercontent.com/56cef8df531519e6e51a365ec22f4fa3aa191984eb3bd1b6b5b248fb469bcf0b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f73746d616e2d4646364333373f7374796c653d666f722d7468652d6261646765266c6f676f3d706f73746d616e266c6f676f436f6c6f723d7768697465)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![amazonec2](https://camo.githubusercontent.com/8f7ba4c88a22f2f0274e67e2530c275bb48ea7a21b2aa300a820ddbbaffc46d8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f616d617a6f6e6563322d4646393930303f7374796c653d666f722d7468652d6261646765266c6f676f3d616d617a6f6e656332266c6f676f436f6c6f723d7768697465)
![githubactions](https://camo.githubusercontent.com/bccbc0c91e2babcf083d1e2bbadb7baa4dc1324494346249a00392a1e20eb4e3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f676974687562616374696f6e732d3230383846463f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562616374696f6e73266c6f676f436f6c6f723d7768697465)
![lombok](https://camo.githubusercontent.com/90664690f2b5f02dda8335c4b5a3d7a61720a800d4892ac4ff301807ea5839e0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6f6d626f6b2d6361303132343f7374796c653d666f722d7468652d6261646765266c6f676f3d646174613a696d6167652f706e673b6261736536342c6956424f5277304b47676f414141414e53556845556741414145414141414241434159414141437161584865414141414358424957584d41414173544141414c457745416d7077594141414565456c45515652346e4f32615734685656526a48503031487a5a4a474a63707555366c303055717a676c347343727167447a35495a5a6a5a51786c45614b424a575641397045454733516b714553727441715768592b5744515a42704632797331444c7a30733373707155324e722f34324776523139655a6156707a4274615a733339776d4c50503376732f612b3231396e64625336536b704b536b704b536b3167454f413134482f6742756b586f446d4d48667643663142484155384c313541484f6c6e6741654e4a332f4175677639514977416a686f4873416b715365416c30336e56307450416a67447542743445396749744141586d2f4e6e41573268382f7233484f6b4a414b63456c7859375a316c6d726e76452f4c356365674c414a4741666c546b453347437533576e4f6651794d6c466f476d42773647576b466c6f5466547763476d577348564868417677446a70525942546e4d6a2f326c48377a5177744a315a7368633455326f4e594958722f4f424f684c37376a5148556a6b632b4148704c7251434d63752f35325a32383730567a333362674e334e387464514b7750326d3455762f7833306e416476436661384339786964743652576f4168664978506475614f426463416d6638376b415a634268775048474e657073364642636763595a7a722f4d3944506e5a2f6d6a4e7a7a51464d48656c2b6161302b55334145576d415976726e422b6d4f74556449383635613848526f645a6f6c356b69764d6b78306e4f414c32417265314e66335064494f437064694c44396d6a4e506973454c75316f2b6c65342f6f4977386e3932346746384b4c6b447244514e66694d594c763362397a2f7561774a7544706e67326d42453156442b615052756c4272772f5732687354716933356e476a30725130396b522b516b594b446b444c44494e667439382f77726f6b364333324767736c4a79686d4d4b32696d4f742f4b77455066554342384c394f717447534d34414c356b4f662b594d345a454a65764f4d5272506b444444654e4c624e6a663738424c32427747366a4d55467968534b442b386730647233352f71754773676d617334314753395a5a494958726976774f374448486479546f6156486b57364d78575849464f44574d637552646c386f4f534e43636154512b7958623067623468594c47757a6b5a7a3179566f39676432475931724a4665412b31794d72694d6557613035515263742f3261314c354b783154396b4776754f4d33784e435a724458416e734b736b52594c687a555330756f30754b313445586a4d62624b544f6f327745476879704f5a49387a6773324a55332b693064435a4e555a79412b67487244454e33653865686872426f516d366a5734783543484a44614350466a5a4e4933584b4c33502b6632786938555272415a48507451346f4f514530414b2f77542b34456e6a504830784b3162334e54503638564941712f764e78312f6f6c77376e6a674d5742366f7659567758314737704b636f45684956726e4f50316d4e7372532b4c73376c4e576356385647457542746335316546616271784b2b2b7072673236537048714e556f7555437849324952476d512b385a6f37505464512b442f6a42364879744b304753417851572b58595834576d4635365a772f7679513969354b4356474271634662524c354a71524e323536616b4e5737556458517572494b32707265504f753174575a53344b507a37624463794d62592f746772366c7742626e4c59575445366f54672b3662756a5775636131687665396f51726c38615556566e32657a6d4a6c68364c69616e64687867304959377567325674336534574644622f4b6f2f2f7257736b46696d31714e7161666d316933312f6637497541425941662f52682f454d38415179516e675764504965304e43596a39486d4443344d645438645550546c634374774d4d685a5931312b306f6458354b4e6c666341632b676531484d733149636c4f514d4d63535773564e7243586a376433486835746957735367416e6835305a4f384d4b725033456a556b4877764857454c4c7139746248517859334953582f4c796b704b536b704b5a48753543382b45545264752b3544364141414141424a52553545726b4a6767673d3d266c6f676f436f6c6f723d7768697465)
![dbeaver](https://img.shields.io/badge/dbeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
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

