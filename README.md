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

---

## 🐾 프로젝트 소개
이 프로젝트는 반려동물 정보를 공유하는 커뮤니티 플랫폼입니다. <br><br>
관리자가 주제별 게시판을 자유롭게 생성할 수 있어, 사용자는 반려동물 자랑, 정보 공유 등의 다양한 게시판을 이용하여 서로 소통할 수 있습니다.<br>
또한, 동물병원과 보호소 목록을 제공하고 지도 기능을 지원해 가까운 병원과 보호소를 쉽게 찾을 수 있도록 했습니다. 이를 통해 반려동물 보호와 돌봄이 더욱 원활하게 이루어질 수 있는 환경을 구축하고자 하였습니다


## 👥 팀원 소개
| ![백도은](https://github.com/user-attachments/assets/85286ad4-3392-4e26-92bc-d3b81d2810ff) | ![안하령](https://github.com/user-attachments/assets/4355d4e3-71fa-49f8-88fe-c9668e259ac7) | ![심재원](https://github.com/user-attachments/assets/02485414-88d3-401f-b936-2330ea09e2c9) | ![박명환](https://github.com/user-attachments/assets/bcb7a701-cf86-4200-be5e-b0ba547d2958) |
|---|---|---|---|
| 백도은 | 안하령 | 심재원 | 박명환 |
| [@donna8780](https://github.com/donna8780) | [@dgf0020](https://github.com/dgf0020) | [@S-JaeWon](https://github.com/S-JaeWon) | [@freemuras](https://github.com/freemuras) |


## 🤝 협업 방식
#### ❇️**GitHub Issue 관리**
 - **이슈 생성**: 각 작업(기능 개발, 버그 수정 등)에 맞는 GitHub Issue를 생성하고, 작업 내용을 상세히 기록함.<br>
 - **이슈 템플릿 사용**: 이슈 생성 시 기능 추가, 버그 수정 등의 항목에 맞는 템플릿을 사용하여 작업을 더 명확하게 기록합니다.
 - **브랜치 명명 규칙**: feat/board#1, fix/login#2 등 이슈 번호를 포함하여 브랜치를 생성.<br>
 - **이슈 상태 관리**: To Do → In Progress → Done 단계로 관리하며, PR이 merge되면 자동으로 완료 처리됨.<br>
 - **레이블 활용**: 기능 추가, 버그 수정 등 태그를 부여하여 작업 상태를 명확하게 구분.


#### ❇️**브랜치 전략**
 - **이슈 기반 브랜치 전략 사용**: 각 이슈를 독립적인 브랜치에서 개발한 후, main 브랜치에 병합.<br>
 - **브랜치 생성**: feature/issue#123, bugfix/issue#456와 같이 이슈 번호를 포함하여 생성.<br>
 - **작업 완료 후 커밋 및 푸시**:
변경 사항을 간결하게 커밋 후 원격 저장소에 푸시.

#### ❇️**Pull Request(PR) 및 코드 리뷰**
 - **PR 생성**: 작업이 완료되면 main 브랜치로 PR을 생성.<br>
 예시: feat: board 관련 기능 추가 (#1) / fix: 로그인 버그 수정 (#2)<br>
 - **PR 템플릿 사용**: PR 생성 시 커스텀 템플릿을 사용하여, 수정된 부분과 해결된 문제 등을 명확하게 작성.
 - **코드 리뷰**:
최소 2명의 팀원이 PR을 리뷰 및 승인.<br>
 - **PR Merge 및 이슈 완료**:
승인된 PR은 merge되고, 해당 이슈는 자동으로 Done 처리됨.

#### ❇️**정기 회의 및 코드 리뷰**
 - **화요일**: 팀 회의를 통해 진행 상황 공유 및 문제 논의.<br>
 - **토요일**: 디스코드를 활용한 코드 리뷰 진행.<br>
 - 프론트엔드는 UI를 시연, 백엔드는 API 및 기능 구현 리뷰.<br>
 - **스타일 및 규칙 정리**: 코드 스타일을 통일하고 지속적으로 개선.



## ⚡프로젝트 아키텍처 및 기술적 특징

### - 백엔드

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

### - 프론트엔드

### 📁 프로젝트 구조

![Image](https://github.com/user-attachments/assets/a78d3d7b-6190-4a57-971d-d2db5f43b2c7)

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

## 🔍 브랜치 전략

우리는 **이슈 기반 브랜치 전략**을 사용하여 프로젝트를 진행하였습니다. 이 방식은 각 이슈를 별도의 브랜치에서 처리하고, 작업이 완료된 후 `main` 브랜치에 병합하는 방법입니다. 이를 통해 각 기능을 독립적으로 개발하고, 충돌을 최소화하면서 작업을 관리할 수 있습니다.

## 작업 흐름

1. **이슈 생성**
   - 각 작업은 GitHub에서 새로운 **이슈**를 생성하여 시작됩니다.
   - 이슈는 기능 개발, 버그 수정 등 다양한 작업 항목을 나타냅니다.

2. **새 브랜치 생성**
   - 각 이슈에 대해 **이슈 번호**를 포함한 새 브랜치를 만듭니다.
   - 예: `feature/issue-123`, `bugfix/issue-456`
   - 이 브랜치에서 해당 이슈를 해결하기 위한 작업을 진행합니다.

3. **작업 완료 후 커밋**
   - 브랜치에서 기능 구현 또는 버그 수정을 완료한 후, 변경 사항을 커밋합니다.
   - 커밋 메시지는 변경 내용을 간결하게 설명합니다.

4. **원격 저장소에 푸시**
   - 커밋한 후 해당 브랜치를 원격 저장소에 푸시합니다.
   - `git push origin 브랜치명`

5. **Pull Request(PR) 생성**
   - 작업이 완료되면, 해당 브랜치에서 `main` 브랜치로 **Pull Request**를 생성합니다.
   - PR을 통해 팀원들이 코드를 리뷰하고, 최종적으로 `main` 브랜치에 병합됩니다.

## 이슈 기반 브랜치 전략의 장점

- **충돌 최소화**: 각 이슈별로 독립적인 브랜치를 사용하므로, 여러 사람이 동시에 작업할 때 충돌을 최소화할 수 있습니다.
- **명확한 작업 분리**: 각 브랜치가 하나의 이슈를 처리하므로, 작업 단위가 명확하게 구분됩니다.
- **효율적인 코드 리뷰**: PR을 통해 변경 사항을 리뷰하고 병합하므로, 코드 품질을 유지할 수 있습니다.
- **자동화된 배포**: `main` 브랜치에 병합된 후 자동화된 배포 파이프라인을 통해 배포가 진행될 수 있습니다.

## ✔ 컨벤션

### 코드 컨벤션

#### 📌 기본 규칙
**구글 코드 스타일**을 따릅니다<br>
**코드 스페이스** : 탭 대신 스페이스 사용합니다 (4칸 -> 2칸)<br>
문자열은 항상 쌍따옴표("")를 사용합니다.<br>
클래스명은 파스칼 케이스(PascalCase), 변수 및 메서드명은 카멜 케이스(camelCase)를 사용합니다.<br>
모든 문장은 세미콜론(;)을 붙입니다.<br>
연산자(=, +, ===, && 등) 사이에는 공백을 추가하여 가독성을 높입니다.<br>
콤마(,) 다음에는 공백을 추가하여 가독성을 높입니다.<br>
예약어 및 키워드는 소문자로 작성합니다. (public, private, if, return 등)<br>

#### 🎯 클래스 및 메서드
클래스명은 명확한 역할을 반영합니다. (UserService, OrderRepository)<br>
Service 클래스는 @Service, Repository 클래스는 @Repository, Controller는 @RestController 어노테이션을 사용합니다.<br>
메서드는 하나의 역할만 수행하도록 작성합니다.<br>

#### 🛠️ 의존성 주입 (Constructor Injection with final)
@Autowired를 사용하지 않고, 생성자 주입을 사용하며 final을 적용합니다.<br>
 - 불변성 보장: final을 사용하여 주입된 의존성이 변경되지 않음을 보장할 수 있습니다.
 - 테스트 용이성: 생성자 주입은 테스트 시 의존성을 명시적으로 주입할 수 있기 때문에, 테스트 코드 작성이 쉬워집니다.
 - 순환 참조 방지: 생성자 주입을 사용하면 순환 참조가 발생할 가능성이 줄어듭니다.

#### ⚠️ 예외 처리 컨벤션
모든 예외는 CustomException을 상속한 커스텀 예외 클래스를 사용하여 처리합니다.<br>
예외 클래스는 구체적인 예외 유형을 나타내는 이름으로 작성합니다. (`DuplicateException`, `UnauthorizedException` 등)<br>
예외 메시지와 상태 코드를 Status enum에 정의된 값으로 설정합니다.<br>
예외 클래스는 CustomException을 상속받고, Status를 인자로 받아 처리합니다.

Status enum에서 정의된 상태 코드를 사용하여 응답 상태를 관리합니다.<br>
Status는 성공, 실패, 에러 상태 등을 관리하며, 각 상태에 맞는 HttpStatus를 포함합니다.<br>

예외 발생 시, @ControllerAdvice를 통해 글로벌 예외 처리를 합니다.<br>
CustomException을 상속받은 예외는 Status에 설정된 상태 코드와 함께 클라이언트에 응답됩니다.

#### 🔧 BaseEntity 및 공통 필드

모든 엔티티는 BaseEntity를 상속하여 공통 필드를 사용합니다.<br>
isDeleted(논리삭제), createdAt, updatedAt과 같은 공통 필드를 BaseEntity에 정의하고, <br>이를 상속받은 각 엔티티에서 사용할 수 있도록 합니다.

#### ✅ RESTful API 설계 규칙
엔드포인트는 동사 대신 명사로 작성합니다.<br>
URL에는 동작을 포함하지 않고 리소스를 나타내도록 설계합니다.<br>
HTTP 메서드를 적절히 사용합니다.<br>
Response는 DTO를 통해 가공 후 반환합니다.<br>

---

### 커밋 컨벤션

#### 브랜치 생성
- **이슈 중심**으로 브랜치를 생성합니다.
- 이슈 번호를 포함하여 브랜치를 만듭니다.
  - 예: `feat/board#1` (이슈 번호 `#1`을 포함하여 브랜치 생성)

#### 커밋 타입
| 타입 이름   | 내용                                        |
|-------------|---------------------------------------------|
| `enh`       | 새로운 기능에 대한 커밋                    |
| `fix`       | 버그 수정에 대한 커밋                      |
| `build`     | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋 |
| `chore`     | 그 외 자잘한 수정에 대한 커밋              |
| `ci`        | CI 관련 설정 수정에 대한 커밋              |
| `docs`      | 문서 수정에 대한 커밋                      |
| `style`     | 코드 스타일 혹은 포맷 등에 관한 커밋       |
| `refactor`  | 코드 리팩토링에 대한 커밋                  |
| `test`      | 테스트 코드 수정에 대한 커밋              |
| `perf`      | 성능 개선에 대한 커밋                      |

위 내용을 기준으로 커밋을 작성하고, 각 커밋의 타입을 적절히 선택하여 관리합니다.


## ⚙ 배포
![image](https://github.com/user-attachments/assets/2b609cd2-3d9f-4e92-aa1d-e96cc2f82b83)


### 배포 방식
이 프로젝트는 AWS EC2 인스턴스를 이용해 배포되었습니다. <br>
EC2 인스턴스의 퍼블릭 IP 주소는 43.200.46.13이며, EC2 인스턴스는 m5.xlarge 타입으로 설정되어 있습니다. 해당 인스턴스는 Amazon Linux 2023 운영 체제를 사용하고 있으며, S3 버킷에 저장된 이미지 파일을 사용하여 필요한 리소스를 관리하고 있습니다.

* 구성 요소
1. EC2 인스턴스
AWS EC2 인스턴스에서 애플리케이션을 실행하며, 이를 통해 사용자 요청을 처리합니다.
EC2 인스턴스에 배포된 애플리케이션은 퍼블릭 IP를 통해 접근 가능합니다.
2. S3 버킷
이미지 파일 등 정적 리소스는 S3 버킷에 저장되어, EC2 인스턴스에서 이를 불러와 사용합니다.
AWS S3를 통해 정적 리소스에 대한 안정적인 스토리지 관리가 이루어집니다.

---

### CI/CD for Spring Boot on AWS

이 프로젝트에서는 **GitHub Actions**를 사용하여 **Spring Boot** 애플리케이션을 **AWS EC2**에 자동 배포하는 **CI/CD** 파이프라인을 설정했습니다. 각 단계는 코드를 빌드하고, Docker 이미지를 생성한 후, AWS EC2 인스턴스에 배포하는 과정을 자동화합니다.

### CI/CD 파이프라인

#### Workflow 구성

- **GitHub Actions** 워크플로우 (`.github/workflows/ci-cd.yml`)
  - **트리거**: `main` 브랜치에 푸시될 때마다 실행됩니다.
  - **목표**: 애플리케이션을 빌드하고 Docker 이미지를 생성하여, **AWS EC2** 인스턴스에 배포합니다.

---

#### CI/CD 단계별 설명

#### 1. **코드 체크아웃**
```yaml
- name: Checkout code
  uses: actions/checkout@v3
```
* 목적: GitHub repository에서 최신 코드를 가져옵니다. 이후 모든 작업은 이 코드를 기준으로 진행됩니다.

2. JDK 설정
```yaml
- name: Set up JDK
  uses: actions/setup-java@v3
  with:
    distribution: 'temurin'
    java-version: '17'
```
* 목적: Java 17을 사용하여 애플리케이션을 빌드합니다. Temurin JDK 배포판을 설정하여 Gradle 빌드 작업을 지원합니다.

3. Gradle 빌드 실행
```yaml
- name: Add execute permission for Gradlew
  run: chmod +x ./gradlew

- name: Build with Gradle
  run: ./gradlew clean build
```
* 목적: Gradle을 사용하여 프로젝트를 빌드합니다. gradlew 실행 파일에 실행 권한을 부여하고, ./gradlew clean build 명령어로 빌드를 수행합니다.

4. Docker 이미지 빌드 및 Docker Hub 푸시
```yaml
- name: Log in to Docker Hub
  uses: docker/login-action@v2
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}

- name: Build and Push Docker Image
  run: |
    IMAGE_TAG=dgf0020/pawstime:${{ github.sha }}
    docker build -t $IMAGE_TAG .
    docker push $IMAGE_TAG
```
* 목적: Docker Hub에 로그인하고, 최신 Docker 이미지를 빌드하여 푸시합니다. 이미지 이름은 dgf0020/pawstime이고, GitHub 커밋 SHA를 기반으로 태그를 설정합니다.

5. EC2에 배포
```yaml
- name: Deploy to EC2
  uses: appleboy/ssh-action@v0.1.8
  with:
    host: ${{ secrets.EC2_HOST }}
    username: ${{ secrets.EC2_USER }}
    key: ${{ secrets.PRIVATE_KEY }}
    script: |
      # 기존 Spring Boot 컨테이너 강제 중지 및 제거
      docker ps -q --filter "name=springboot_app" | grep -q . && docker rm -f springboot_app || true
    
      # 기존 React 컨테이너 강제 중지 및 제거
      docker ps -q --filter "name=react_app" | grep -q . && docker rm -f react_app || true
    
      # Spring Boot 컨테이너 이미지 태그 업데이트
      sed -i "s|image: dgf0020/pawstime:.*|image: dgf0020/pawstime:${{ github.sha }}|" /home/***/app/docker-compose.yml
    
      # React 컨테이너 항상 최신 이미지 사용
      sed -i "s|image: react_frontend:.*|image: react_frontend:latest|" /home/***/app/docker-compose.yml
    
      # 최신 React 프론트엔드 이미지 가져오기
      docker-compose -f /home/***/app/docker-compose.yml pull react
    
      # 컨테이너 재시작
      docker-compose -f /home/***/app/docker-compose.yml up -d springboot react
```
* 목적: SSH를 사용하여 AWS EC2에 접속하고, Spring Boot와 React 애플리케이션을 최신 Docker 이미지로 배포합니다. 기존의 컨테이너를 중지하고, docker-compose.yml 파일을 업데이트하여 새 이미지를 사용하도록 설정합니다. 이후, 최신 이미지를 Pull하여 새로운 컨테이너를 실행합니다.

#### AWS 연동
AWS EC2<br>
애플리케이션은 AWS EC2에 Docker 컨테이너로 배포됩니다. EC2 인스턴스에 직접 접속하여 Docker Compose를 사용해 Spring Boot와 React 애플리케이션을 실행합니다.
환경 변수는 GitHub Secrets에 안전하게 저장되며, 배포 시 EC2 인스턴스로 전달됩니다.

#### AWS S3 연동
AWS S3는 애플리케이션에서 파일 저장소로 사용됩니다. 사용자 프로필 이미지 및 기타 파일을 저장하며, 액세스 키와 비밀 키는 GitHub Secrets를 통해 안전하게 관리됩니다.

#### 환경 변수 관리
GitHub Secrets에 저장된 AWS 관련 환경 변수:<br>
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME
Kakao Map API Key 등 외부 API와 연동되는 비밀 키들
배포 과정에서 이러한 변수들은 EC2 인스턴스로 전달되어 해당 애플리케이션이 올바르게 동작할 수 있도록 도와줍니다.



## 🛠 개발 도구


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
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Styled-Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
### 백엔드 개발 기술 스택

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

### 프론트엔드 개발 기술 스택

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

## 📄 API 명세서 및 ERD 설계도

### 유저 API

| **기능**         | **회원 가입**                            |
|------------------|-----------------------------------------|
| **API 이름**     | `createUser`                            |
| **API 주소**     | `/users`                                |
| **CRUD**         | Create                                  |
| **Method**       | POST                                    |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/802b8365-8d91-4c58-a6c3-09ad6276338e)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/1a9e4e86-ffc4-477d-8e8b-22a88896e7cb)


| **기능**         | **로그인**                               |
|------------------|-----------------------------------------|
| **API 이름**     | `loginUser`                             |
| **API 주소**     | `/users/login`                          |
| **CRUD**         | Read                                    |
| **Method**       | POST                                    |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/576ebb16-c8a7-4dee-9aaf-de09f0f62abf)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/aca5c5ad-feee-420f-8f33-42ef0b175570)


| **기능**         | **로그아웃**                             |
|------------------|-----------------------------------------|
| **API 이름**     | `logoutUser`                            |
| **API 주소**     | `/users/logout`                         |
| **CRUD**         | Update                                  |
| **Method**       | POST                                    |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/438186c3-c050-4ed2-966c-8ca4e0e12892)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/0bc3ff09-1733-476e-b28e-67d51d5e0bd3)


| **기능**         | **userId를 통해 유저 정보 조회**          |
|------------------|-----------------------------------------|
| **API 이름**     | `getUserFromUserId`                     |
| **API 주소**     | `/users/{userId}`                       |
| **CRUD**         | Read                                    |
| **Method**       | GET                                     |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/e1c4ec65-6454-4625-98b4-5be6e7ee376b)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/91f16ed6-34fd-4998-b462-f832ac70fafe)


| **기능**         | **회원 탈퇴**                            |
|------------------|-----------------------------------------|
| **API 이름**     | `deleteUser`                            |
| **API 주소**     | `/users/{userId}`                       |
| **CRUD**         | Delete                                  |
| **Method**       | DELETE                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/128d3d4a-e896-4959-82d3-1f60b0da6ec9)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/f10197b4-f392-4502-ab78-c595a160448b)


| **기능**         | **현재 로그인한 사용자의 닉네임 변경**     |
|------------------|-----------------------------------------|
| **API 이름**     | `updateNick`                            |
| **API 주소**     | `/users/me/nick`                        |
| **CRUD**         | Update                                  |
| **Method**       | PUT                                     |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/21f78f21-6b52-4c98-abf3-28a714fe9f05)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/6c26d940-41cb-4042-b2a9-e6ab271a701a)


| **기능**         | **현재 로그인한 사용자의 비밀번호 변경**   |
|------------------|-----------------------------------------|
| **API 이름**     | `updatePassword`                        |
| **API 주소**     | `/users/me/password`                    |
| **CRUD**         | Update                                  |
| **Method**       | PUT                                     |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/deadb752-6d7a-48cc-b27f-494f4f0ef4d2)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/c48ec096-0e85-40ef-9e19-1eee87c94b29)


---

### 게시판 API

| **기능**         | **게시판 생성**                       |
|------------------|--------------------------------------|
| **API 이름**     | `createBoard`                        |
| **API 주소**     | `/boards`                            |
| **CRUD**         | Create                               |
| **Method**       | POST                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/3c913efa-2fec-4eac-89bc-737875fde1d1)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/d5f88437-8a25-4ee3-bd63-251ddf078895)

  
| **기능**         | **게시판 상세 조회**                  |
|------------------|--------------------------------------|
| **API 이름**     | `getBoard`                           |
| **API 주소**     | `/boards/{boardId}`                  |
| **CRUD**         | Read                                 |
| **Method**       | GET                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/64a43f48-ae2d-4b7c-a112-f4f1de497927)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/2a283ede-bb15-4714-a320-dba982d9c0cc)


| **기능**         | **게시판 목록 조회**                  |
|------------------|--------------------------------------|
| **API 이름**     | `getBoardList`                       |
| **API 주소**     | `/boards`                            |
| **CRUD**         | Read                                 |
| **Method**       | GET                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/ddc0519e-b09d-4122-b080-8d081a47bd31)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/9940a36c-5c09-4d22-b232-4736a9ae0307)


| **기능**         | **게시판 삭제**                       |
|------------------|--------------------------------------|
| **API 이름**     | `deleteBoard`                        |
| **API 주소**     | `/boards/{boardId}`                  |
| **CRUD**         | Delete                               |
| **Method**       | DELETE                               |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/0afa1e8e-a8a8-42ef-9ba6-52443732560a)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/14a98964-9972-48ae-8459-dd4be9f3eadd)


| **기능**         | **게시판 수정**                       |
|------------------|--------------------------------------|
| **API 이름**     | `updateBoard`                        |
| **API 주소**     | `/boards/{boardId}`                  |
| **CRUD**         | Update                               |
| **Method**       | PUT                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/a689701f-07b3-47b9-938b-6b63009c79b9)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/9950fc02-6e29-4855-b652-fb98ccbf3dd0)


---

### 게시글 API

| **기능**            | **게시글 생성**                       |
|---------------------|---------------------------------------|
| **API 이름**        | createPost                           |
| **API 주소**        | `/posts`                             |
| **CRUD**            | Create                                |
| **Method**          | POST                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/70133245-8ab7-4e08-8688-a1d082f330dd)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/e4b7032d-e321-4daa-bcc2-4b85762efcf4)


| **기능**            | **게시글 이미지 업로드**             |
|---------------------|--------------------------------------|
| **API 이름**        | uploadImages                         |
| **API 주소**        | `/posts/{postId}`                    |
| **CRUD**            | Create                                |
| **Method**          | POST (파일 업로드)                   |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/e449f1cd-b6d9-437b-a216-d8cdac6d15bb)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/408e47ef-917b-4157-8569-c6e0e09d41bc)


| **기능**            | **게시글 수정**                      |
|---------------------|--------------------------------------|
| **API 이름**        | updatePost                           |
| **API 주소**        | `/posts/{postId}`                    |
| **CRUD**            | Update                               |
| **Method**          | PUT                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/5823c1c1-0f05-4dd9-9c48-83e22d84899b)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/98d0dc5f-e907-42f5-98bf-9751abfedbcb)


| **기능**              | **게시글 이미지 수정**                         |
|-----------------------|------------------------------------------------|
| **API 이름**          | updatePostImages                              |
| **API 주소**          | `/posts/{postId}/images`                       |
| **CRUD**              | Update                                        |
| **Method**            | PUT                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/afe19d9e-ab78-465b-91a8-9e978d706d9f)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/b5c2fb48-9e97-4b59-9e39-2f325a834612)


| **기능**            | **게시글 삭제**                      |
|---------------------|--------------------------------------|
| **API 이름**        | deletePost                           |
| **API 주소**        | `/posts/{postId}`                    |
| **CRUD**            | Delete                               |
| **Method**          | DELETE                               |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/f2d02fda-7545-45ca-963c-e4425f8c609a)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/e5ecce7e-6c5a-4016-9b17-dc0b34ade290)


| **기능**              | **게시글 상세 조회**                           |
|-----------------------|------------------------------------------------|
| **API 이름**          | getDetailPost                                  |
| **API 주소**          | `/posts/{postId}`                              |
| **CRUD**              | Read                                          |
| **Method**            | GET                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/88436c01-2414-4396-aa8e-c632aeee3b9a)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/8ea0a6b0-821f-4462-86ef-d6d2c0ff47e0)


| **기능**              | **게시글 목록 조회**                           |
|-----------------------|------------------------------------------------|
| **API 이름**          | getPosts                                      |
| **API 주소**          | `/posts`                                      |
| **CRUD**              | Read                                          |
| **Method**            | GET                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/1bcd8ee2-38ab-4a37-ad1d-ca5f4fd330bd)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/8776009e-51dc-414b-bb62-c1bca0c0b347)


| **기능**              | **현재 로그인한 사용자가 작성한 게시글 목록 조회** |
|-----------------------|---------------------------------------------------|
| **API 이름**          | getPostListByUser                               |
| **API 주소**          | `/posts/me`                                     |
| **CRUD**              | Read                                           |
| **Method**            | GET                                            |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/bca1dc2c-6d06-44da-8fd9-0850e2b39074)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/05727b68-7bf6-4308-8dfe-c347aee3974f)


| **기능**              | **게시글별 대표 이미지 조회**                   |
|-----------------------|------------------------------------------------|
| **API 이름**          | getThumbnail                                   |
| **API 주소**          | `/posts/{postId}/thumbnail`                    |
| **CRUD**              | Read                                          |
| **Method**            | GET                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/b2829ab3-c9a2-435d-a6fd-b4339da890bf)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/62db5292-8e8f-437b-9bc4-e1f414f607c5)


| **기능**              | **게시글별 이미지 전체 조회**                   |
|-----------------------|------------------------------------------------|
| **API 이름**          | getImages                                      |
| **API 주소**          | `/posts/{postId}/images`                       |
| **CRUD**              | Read                                          |
| **Method**            | GET                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/ad3479df-c9e1-445a-98b4-9f39a0e517fd)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/8b209246-67d2-4004-be45-f46a14f6eba5)


| **기능**              | **메인페이지에서 사용할 랜덤 이미지 조회**      |
|-----------------------|------------------------------------------------|
| **API 이름**          | getRandomImages                                |
| **API 주소**          | `/posts/images/random`                         |
| **CRUD**              | Read                                          |
| **Method**            | GET                                           |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/f721b0a4-47ea-445f-b0b7-1c9879c82a1f)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/c3050e27-f4ad-468a-8b42-e6d35e541026)


---

### 댓글 API

| **기능**            | **댓글 생성**                        |
|---------------------|--------------------------------------|
| **API 이름**        | createComment                        |
| **API 주소**        | `/posts/{postId}/comments`           |
| **CRUD**            | Create                               |
| **Method**          | POST                                 |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/0e4440df-5bd0-4104-ba79-62e9a085621c)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/bc63d45b-3652-44fc-b48d-2ff739981edc)


| **기능**            | **댓글 전체 목록 조회**              |
|---------------------|--------------------------------------|
| **API 이름**        | getCommentAll                        |
| **API 주소**        | `/comments`                          |
| **CRUD**            | Read                                 |
| **Method**          | GET                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/8d83a740-7775-494b-99a9-329b4f311fd8)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/3c86f8d9-65cd-4cc7-80da-811789b9d116)


| **기능**            | **특정 게시글 댓글 조회**            |
|---------------------|--------------------------------------|
| **API 이름**        | getCommentByPost                     |
| **API 주소**        | `/posts/{postId}/comments`           |
| **CRUD**            | Read                                 |
| **Method**          | GET                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/7adf8bc0-27db-4360-9265-b34a67191be8)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/caa4cb16-a803-427b-ae89-f91da356a7f2)


| **기능**            | **댓글 삭제**                        |
|---------------------|--------------------------------------|
| **API 이름**        | deleteComment                        |
| **API 주소**        | `/posts/{postId}/comments/{commentId}`|
| **CRUD**            | Delete                               |
| **Method**          | DELETE                               |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/c4cf52fc-7ce7-4d5b-bec0-5c6c796c1a88)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/9d4a06ff-8298-4348-be61-a4b01db67b40)


| **기능**            | **댓글 수정**                        |
|---------------------|--------------------------------------|
| **API 이름**        | updateComment                        |
| **API 주소**        | `/posts/{postId}/comments/{commentId}`|
| **CRUD**            | Update                               |
| **Method**          | PUT                                  |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/4f01bd19-7dbd-40a3-a0c1-eecf1d2a1311)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/4ef8b2cd-02de-4dad-9bb4-100ab01bea10)


| **기능**            | **현재 로그인한 사용자가 작성한 댓글 목록 조회**|
|---------------------|--------------------------------------|
| **API 이름**        | getCommentListByUser        |
| **API 주소**        | `/comments/me`    |
| **CRUD**            | Read    |
| **Method**          | GET                                |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/0ab75e92-6fa0-4ba4-832e-f2c382108622)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/f7908b08-d711-4fed-8a80-90755c2b518e)


---

### 좋아요 API

| **기능**      | **좋아요 토글**                           |
|---------------|------------------------------------------|
| **API 이름**  | `toggleLike`                             |
| **API 주소**  | `/likes/{postId}`                        |
| **CRUD**      | Update                                   |
| **Method**    | PUT                                      |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/14028bd6-3384-4f79-ade5-f0ca3f69030c)
* 응답 예시
  (한 번 클릭시 좋아요 증가 (데이터:1)
  ![image](https://github.com/user-attachments/assets/6aa85cd2-c45a-4092-b20e-049fb39570b9)
  (한 번 더 클릭시 좋아요 감소 (데이터:0)
  ![image](https://github.com/user-attachments/assets/717501c2-f1f9-4b7d-ac9f-dcafe223a7d4)



---

### 프로필 이미지 API

| **기능**          | **프로필 이미지 변경**                     |
|-------------------|-------------------------------------------|
| **API 이름**      | `updateProfileImg`                        |
| **API 주소**      | `/profileImg/{userId}`                    |
| **CRUD**          | Update                                    |
| **Method**        | PUT                                       |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/f5189496-7c5a-4e37-8d7f-7856165aff6d)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/26a49d74-68ab-4350-a591-f8866e5b62fd)


| **기능**          | **프로필 이미지 삭제**                     |
|-------------------|-------------------------------------------|
| **API 이름**      | `deleteProfileImg`                        |
| **API 주소**      | `/profileImg/{userId}`                    |
| **CRUD**          | Delete                                    |
| **Method**        | DELETE                                    |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/806d44b8-8fef-4305-9814-8327dc2a3f62)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/e22f9458-5854-44b8-bcb5-7059e991ca70)


| **기능**          | **프로필 이미지 조회**                     |
|-------------------|-------------------------------------------|
| **API 이름**      | `getProfileImg`                           |
| **API 주소**      | `/profileImg/{userId}`                    |
| **CRUD**          | Read                                      |
| **Method**        | GET                                       |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/00420595-e39b-41e9-bc30-1bd95b257fec)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/d52e55cf-a842-4de4-a92a-fbe16ba4c7ed)


---

### 정보게시판 API

| **기능**         | **지역별 동물 병원 정보 목록 조회**         |
|------------------|-----------------------------------------|
| **API 이름**     | `getHospitalInfo`                       |
| **API 주소**     | `/info/hospitals/{addNum}`              |
| **CRUD**         | Read                                    |
| **Method**       | GET                                     |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/74c3ad4a-a418-47f5-a761-d9cf90ff6a8e)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/aa92603d-658f-4ab9-b791-5a281abaf6ad)


| **기능**         | **지역별 동물 보호소 정보 목록 조회**      |
|------------------|-----------------------------------------|
| **API 이름**     | `getShelterInfo`                        |
| **API 주소**     | `/info/shelters/{addNum}`               |
| **CRUD**         | Read                                    |
| **Method**       | GET                                     |
* 요청 예시
  ![image](https://github.com/user-attachments/assets/3c99d2be-3902-4e22-839b-3d8f2e402f2c)
* 응답 예시
  ![image](https://github.com/user-attachments/assets/fc014b99-cf1f-4996-9272-9111cbfd271b)


---
## ERD 설계도
![image](https://github.com/user-attachments/assets/a97dc960-b726-426f-bf37-f8b04911a38a)


## 📡 응답구조

### 성공

- **조회 성공**: ✔️`success`
- **생성 성공**: 🆕`create`
- **수정 성공**: ✏️`update`
- **삭제 성공**: 🗑️`delete`

### 실패

- **요청 데이터가 잘못된 경우**: ⚠️`invalid`
  
  예시:
  
  - 사용자가 이메일 필드에 이메일 형식이 아닌 값을 입력했을 때.
  - 숫자만 입력되어야 하는 필드에 문자가 포함된 경우.
  - 필수 입력값이 누락된 경우.
  - 로그인 요청에서 비밀번호를 누락했을 때.
  - 비어있는 필드를 보내는 요청.

- **이미 존재하는 데이터로 새롭게 생성하려는 경우**: 🔁`duplicate`
  
  예시:
  
  - 동일한 이메일로 회원가입을 시도했을 때.
  - 이미 존재하는 사용자명으로 새 계정을 생성하려는 경우.

- **요청한 리소스가 존재하지 않는 경우**: 🔍`notFound`
  
  예시:
  
  - 존재하지 않는 게시글 ID를 조회하려 할 때.
  - 삭제된 리소스를 조회하려 할 때.

- **인증되지 않은 사용자가 접근하려는 경우**: 🔑`unauthorized`
  
  예시:
  
  - 로그인하지 않은 사용자가 게시글을 작성하려고 시도하는 경우.
  - 로그인하지 않은 사용자가 프로필을 수정하려고 할 때.
  - 인증이 필요한 API를 인증 토큰 없이 접근할 때.

- **인증은 되었지만 권한이 없는 경우**: 🚫`forbidden`
  
  예시:
  
  - 일반 사용자가 관리자 전용 페이지에 접근하려 할 때.
  - 특정 리소스에 대한 읽기/쓰기 권한이 없는 사용자.
  - 관리자가 아닌 사용자가 다른 사용자의 개인정보를 조회하려 할 때.

### 에러

- **예상치 못한 예외가 발생한 경우**: ❗`error`

---

### 응답구조 예시

#### 게시판 생성

- 생성 성공: `create`

```json
{
  "status": "CREATE",
  "message": "게시판 생성이 완료되었습니다.",
  "data": null
}
```

* 이미 존재하는 데이터로 새롭게 생성하려는 경우: duplicate
```json
{
  "status": "DUPLICATE",
  "message": "이미 존재하는 게시판입니다.",
  "data": null
}
```

* 요청 데이터가 잘못된 경우 (필수 입력값이 누락된 경우): invalid
```json
{
  "status": "INVALID",
  "message": "게시판 제목은 필수 입력값입니다.",
  "data": null
}
```

#### 게시판 목록 조회
* 조회 성공: success
```json
{
  "status": "SUCCESS",
  "message": null,
  "data": [
    {
      "boardId": 12,
      "title": "응답 구조 ㅌㅔㅅ,ㅌ,ㄴ",
      "description": null,
      "isDelete": false,
      "createdAt": "2024-12-19T15:31:29.988393",
      "updatedAt": "2024-12-19T15:31:29.988393"
    },
    {
      "boardId": 11,
      "title": "게시판 생성 테스트",
      "description": "응답구조 테스트 수정!!",
      "isDelete": false,
      "createdAt": "2024-12-19T15:15:49.619025",
      "updatedAt": "2024-12-19T16:02:00.544634"
    }
  ]
}
```

#### 게시판 상세 조회
* 조회 성공: success
```json
{
  "status": "SUCCESS",
  "message": null,
  "data": {
    "boardId": 14,
    "title": "241219 게시판",
    "description": "241219 게시판 입니다",
    "isDelete": false,
    "createdAt": "2024-12-19T16:17:04.281766",
    "updatedAt": "2024-12-19T16:17:04.281766"
  }
}
```

* 요청한 리소스가 존재하지 않는 경우: notFound (존재하지 않는 게시판 ID 입력)
```json
{
  "status": "NOTFOUND",
  "message": "존재하지 않는 게시판 ID입니다.",
  "data": null
}
```

#### 게시판 수정
* 수정 성공: update
```json
{
  "status": "UPDATE",
  "message": "게시판 수정이 완료되었습니다.",
  "data": null
}
```

* 이미 존재하는 데이터로 수정하려는 경우: duplicate
```json
{
  "status": "DUPLICATE",
  "message": "이미 존재하는 게시판입니다.",
  "data": null
}
```
* 요청한 리소스가 존재하지 않는 경우: notFound (존재하지 않는 게시판 ID 입력)
```json
{
  "status": "NOTFOUND",
  "message": "존재하지 않는 게시판 ID입니다.",
  "data": null
}
```

* 요청한 리소스가 존재하지 않는 경우: notFound (삭제된 게시판 ID 입력)
```json
{
  "status": "NOTFOUND",
  "message": "이미 삭제된 게시판입니다.",
  "data": null
}
```

#### 게시판 삭제
* 삭제 성공: delete
```json
{
  "status": "DELETE",
  "message": "게시판이 삭제되었습니다.",
  "data": null
}
```

*요청한 리소스가 존재하지 않는 경우: notFound (삭제된 게시판 ID 입력)
```json
{
  "status": "NOTFOUND",
  "message": "이미 삭제된 게시판입니다.",
  "data": null
}
```

* 요청한 리소스가 존재하지 않는 경우: notFound (존재하지 않는 게시판 ID 입력)
```json
{
  "status": "NOTFOUND",
  "message": "존재하지 않는 게시판 ID입니다.",
  "data": null
}
```


## 📋 메뉴 구조도
피그마로 구성한 초기 페이지
![Image](https://github.com/user-attachments/assets/b0b78903-2fa3-4e04-9cb9-06bf319cc7bf)

![Image](https://github.com/user-attachments/assets/36aa4a4c-73bd-4287-bcb5-003cdd409459)

메인 페이지
![Image](https://github.com/user-attachments/assets/6df20ec0-567f-4cf2-96df-0a55e8fb3214)

## 🖥 화면 구현
회원가입

https://github.com/user-attachments/assets/55df9db7-ae38-4926-b57f-1712c46fa7cf

로그인

https://github.com/user-attachments/assets/d3d39734-69a5-4489-bcce-b2d3c0e1e768

로그아웃

https://github.com/user-attachments/assets/590e51c4-dbdd-4c9e-9b7d-a493168e58ac

회원탈퇴

![회원탈퇴](https://github.com/user-attachments/assets/042e2d4a-86c4-454b-bc48-bb6bc99345d7)

게시판 생성

https://github.com/user-attachments/assets/bdd44cb2-a0aa-4bcb-9955-0e2dbaced559

게시판 수정

https://github.com/user-attachments/assets/10c05536-76fa-4925-8cfb-d94059504df6

게시판 삭제

https://github.com/user-attachments/assets/d3e78a73-9ae9-43c1-8276-62a43b114805

메인 페이지 이미지

https://github.com/user-attachments/assets/78d1f899-a2c9-419f-b352-3a5f4ba06e3a

검색 설정

https://github.com/user-attachments/assets/49c47367-dcb3-48b8-9f70-6c7212864c10

게시글 작성

https://github.com/user-attachments/assets/b32c77aa-6682-4aac-b887-faad368b452f

게시글 수정

https://github.com/user-attachments/assets/8263c63b-99c5-4241-a2c7-8de25f4b20bc

게시글 삭제

https://github.com/user-attachments/assets/0301c482-5c29-4221-81b7-aec17910ba90

댓글 작성 및 수정, 삭제

https://github.com/user-attachments/assets/632d2f2a-174a-476c-81f6-74e2d05428c9

좋아요

https://github.com/user-attachments/assets/fb922e4f-6554-4575-accf-e0123fa7af42

닉네임 변경

https://github.com/user-attachments/assets/2aa59006-49eb-4a62-b3a3-b9edb364882f

내가 쓴 글과 댓글

https://github.com/user-attachments/assets/0c3807ed-7e81-4cc8-b74e-1f77cc479944

프로필 수정 및 삭제

https://github.com/user-attachments/assets/0989cc2f-0c05-403b-8631-26d673652f42

비밀번호 변경

https://github.com/user-attachments/assets/16dcd8cc-1204-4744-8117-928ac7fc726d
