# [JEduTools Portal](http://jedutools.jbnu.ac.kr)
JEdutools Portal은 다양한 SW 교육 도구를 통합 관리하고, JIGSSO(Keycloak) 기반 로그인 세션 관리와 안내를 통해 사용자들이 JEduTools 서비스에 접근하기 위한 중심 플랫폼 입니다. 이 가이드는 JEduTools Portal 프로젝트를 이해하고, 프로젝트를 수정하거나 새로운 기능을 추가하는 방법을 배울 수 있도록 돕습니다.

## 개요
### 기술 스택
JEduTools Portal은 JavaScript(TypeScript)를 이용하여 서버가 없는 단일 페이지 애플리케이션(SPA)을 구성하는 것을 목표로 합니다.

- 주요 사용 언어
  - [TypeScript](https://www.typescriptlang.org/)
- 프론트엔드 프레임워크:
  - [React](https://react.dev/)
  - [React Router](https://reactrouter.com/)
- 프론트엔드 빌드 도구(번들러)
  - [Vite](https://vitejs.dev/)
- 컴포넌트 라이브러리
  - [MUI](https://mui.com/)
- 통합 로그인:
  - [Keycloak](https://www.keycloak.org/)
  - [react-oidc-context](https://github.com/authts/react-oidc-context)
  - [oidc-client-ts](https://github.com/authts/oidc-client-ts)

## 환경 설정

### 필수 도구 설치

[Node.js](https://nodejs.org/ko/download/) 16 이상 설치.

```
node -v
```

## 프로젝트 클론 및 실행

### 프로젝트 포크

먼저, [JEduTools Portal](https://github.com/JBNU-JEduTools/portal) 프로젝트를 포크합니다. 포크된 저장소는 본인의 GitHub 계정에 생성됩니다.

### 프로젝트 클론

본인의 저장소에 생성된 레포지토리를 로컬 환경에 복사합니다.

```
git clone https://github.com/[YourUsername]/portal.git
cd portal
```

### 종속성 설치

```
npm install
```

### 환경 변수 설정(선택 사항)

통합 로그인 관련 기능을 수정하려면, 테스트용 Keycloak 서버가 필요합니다. 이 서버의 경로를 환경 변수에 추가해야 정상적으로 테스트할 수 있습니다. 단, 통합 로그인 관련 기능을 수정하지 않는 경우에는 환경 변수를 설정하지 않아도 됩니다.

테스트 환경을 설정하려면 프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 추가해 주세요:
```env
# Keycloak 서버 URL
VITE_KEYCLOAK_URL=http://www.example.keycloak.com 

# Keycloak 서버의 Realms 이름
VITE_KEYCLOAK_REALMS=example_realms
```
환경 변수가 설정되지 않은 경우, 테스트 중 로그인 기능이 정상적으로 동작하지 않을 수 있으니 주의해 주세요.

### 개발 서버 실행

다음 명령어를 사용해 개발 서버를 실행하면, 수정 사항을 바로 확인하실 수 있습니다.

```
npm run dev
```

## 프로젝트 구조

### 주요 디렉토리

```
src: 프로젝트 소스 코드
  ├── pages: 페이지 구성 컴포넌트
  ├── components: 재사용 가능한 UI 요소
  ├── hooks: 커스텀 훅 및 Keycloak 인증 관련 함수
  ├── router.tsx: 라우팅 설정
  └── App.tsx: 루트 컴포넌트
```

## 메인 페이지 수정 가이드

HomePage는 포털 페이지의 핵심 화면으로, 사용자가 처음 방문했을 때 접하게 되는 페이지입니다. 이 페이지는 여러 컴포넌트로 구성되어 있으며, 각 컴포넌트는 개별 파일로 관리되어 있어 쉽게 수정 및 추가가 가능합니다.

### 파일 경로 및 구조

pages/HomePage.tsx는 다음과 같은 구조로 되어 있습니다:

```
src/pages/HomePage/
  ├── index.tsx       // 메인 진입점
  ├── Hero.tsx        // 페이지 상단의 히어로 섹션
  ├── Projects.tsx    // 프로젝트 소개 섹션
  ├── Contact.tsx     // 문의 및 연락처 섹션
  └── ServiceCard.tsx // 프로젝트 카드 컴포넌트
```

`Hero`, `Projects`, `Contact`, `ServiceCard`와 같은 주요 컴포넌트는 `index.tsx`에서 통합되어 렌더링됩니다. 디자인과 내용을 조정할 때는 [**Material-UI (MUI)**](https://mui.com/material-ui/getting-started/)를 참고하여 작업하시면 되겠습니다.

## 페이지 추가 가이드

새로운 페이지를 추가하려면, `src/pages` 디렉토리 내에 새로운 폴더를 생성하고, 해당 폴더에 `index.tsx` 파일을 작성해 주시기 바랍니다.  
완성된 컴포넌트는 `src/router.tsx` 파일에 경로를 지정하여 등록하면, 원하는 URL에서 접근이 가능합니다.

예시:

1. `src/pages/NewPage/index.tsx` 파일 생성.
2. `src/router.tsx` 파일에서 다음과 같이 경로를 등록:

```jsx
import NewPage from "./pages/NewPage";

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="new-page" element={<NewPages />} />
    // ...
  </Route>
);
```

## 통합 로그인 수정 가이드

통합 로그인과 관련된 코드는 `src/hooks/useKeycloak.ts` 파일에 작성되어 있습니다.  
또한, `src/main.tsx` 파일에서는 **react-oidc-context**와 **oidc-client-ts** 라이브러리를 활용하여 인증 기능을 주입하고 있습니다.

수정이 필요한 경우, 각 라이브러리의 공식 문서를 참고해 주시기 바랍니다:

- **react-oidc-context**: [GitHub 저장소](https://github.com/authts/react-oidc-context)
- **oidc-client-ts**: [GitHub 저장소](https://github.com/authts/oidc-client-ts)

### 주요 파일

- `src/hooks/useKeycloak.ts`: 로그인/로그아웃 및 사용자 상태 관리 로직.
- `src/main.tsx`: 인증 관련 설정 및 초기화.

### 수정 방법

1. **로그인 동작 변경**:  
   `useKeycloak.ts`에서 `handleLogin`, `handleLogout` 함수 또는 관련 로직을 수정해 필요에 맞게 로그인 플로우를 변경하세요.
2. **OIDC 설정 변경**:  
   `src/main.tsx` 파일에서 `AuthProvider`의 설정 값을 수정해 인증 서버의 URL, 클라이언트 ID, 리디렉션 경로 등을 업데이트할 수 있습니다.

## 제출 및 반영

1. **수정 사항 업로드**  
   변경된 내용을 `git commit` 및 `git push` 명령어를 사용하여 본인의 저장소에 업로드해 주세요.

2. **풀 리퀘스트 작성**  
   수정된 기능을 메인 브랜치에 반영하려면, 지금까지의 변경 사항을 `JEduTools/portal` 저장소의 `master` 브랜치로 풀 리퀘스트를 작성해 주시기 바랍니다.

3. **검토 및 병합**  
   제출된 풀 리퀘스트는 저장소 관리자가 확인한 후, 메인 브랜치에 병합됩니다.
