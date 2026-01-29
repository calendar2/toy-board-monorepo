# Toy Board Monorepo

**Toy Board Monorepo** 프로젝트에 오신 것을 환영합니다!

이 프로젝트는 **NestJS** 아키텍처와 **모노레포(Monorepo)** 구조를 실습하고 이해하기 위해 만들어졌습니다. 간단한 게시판 CRUD를 구현했지만, 핵심 목표는 풀스택 TypeScript 환경에서 NestJS의 구조적 이점과 타입 공유의 효율성을 경험하는 것입니다.

## 🎯 핵심 목표 및 배운 점

### 1. NestJS: Node 진영의 Spring Boot

- **구조화된 아키텍처**: Module, Controller, Service로 나뉘는 계층형 구조를 통해 Spring Boot와 유사한 체계적인 개발 방식을 경험했습니다.
- **데코레이터 활용**: `@Controller`, `@Get`, `@Post`, `@Injectable` 등 데코레이터를 사용하여 라우팅과 의존성 주입(DI)을 선언적으로 처리했습니다.
- **관심사의 분리**: 비즈니스 로직(Service)과 요청 처리(Controller)를 명확히 분리하여 유지보수성을 높였습니다.

### 2. 모노레포 & 타입 공유 (Monorepo & Type Sharing)

- **Turborepo/PNPM Workspaces**: 하나의 저장소에서 여러 애플리케이션과 패키지를 효율적으로 관리했습니다.
- **공통 타입 (`@repo/types`)**:
  - `Board` 인터페이스와 같은 데이터 모델을 한곳에서 관리하여 단일 진실 공급원(Single Source of Truth)을 확보했습니다.
  - **효과**: 프론트엔드(`apps/web`)와 백엔드(`apps/api`)가 동일한 타입 정의를 공유하므로, 한쪽에서 타입이 변경되면 양쪽 모두에 즉시 반영되어 타입 안전성이 보장됩니다.

## 📂 프로젝트 구조

- **apps/api** (NestJS)
  - 게시판 리소스를 담당하는 RESTful API 백엔드 서버입니다.
  - `nest g resource board` 명령어를 사용하여 표준 보일러플레이트 구조를 따릅니다.
- **apps/web** (Next.js)
  - API와 통신하는 프론트엔드 애플리케이션입니다 (이번 데모에서는 CSR 방식으로 구현).
  - 간단한 `fetch` 래퍼를 통해 API 데이터를 소비합니다.
- **packages/types**
  - API와 Web 양쪽에서 공통으로 사용하는 TypeScript 타입 정의가 포함되어 있습니다.

## 🚀 시작하기 (Getting Started)

1.  **의존성 설치**

    ```bash
    pnpm install
    ```

2.  **백엔드 실행 (API)**

    ```bash
    # 터미널 1
    cd apps/api
    pnpm start:dev
    ```

    - API는 `http://localhost:3000`에서 실행됩니다.

3.  **프론트엔드 실행 (Web)**
    ```bash
    # 터미널 2
    cd apps/web
    pnpm dev
    ```

    - Web은 `http://localhost:3001`에서 실행됩니다.

## 📝 주요 기능

- **게시판 CRUD**: 게시글 작성, 목록 조회, 상세 조회, 수정, 삭제 기능.
- **CORS 설정**: API 서버에서 프론트엔드 포트의 요청을 허용하도록 설정.
- **CSR 구현**: Next.js의 React Client Component를 사용하여 클라이언트 사이드 렌더링 구현.
