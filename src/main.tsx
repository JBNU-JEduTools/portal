import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import type { User } from "oidc-client-ts";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/index.css";

// JIGSSO(Keycloak) 주소는 배포 플랫폼의 빌드 환경변수가 아닌 이 저장소에서 관리합니다.
// 빌드 환경변수로 두면 저장소를 고쳐도 반영되지 않아 로그인이 깨질 수 있습니다.
const KEYCLOAK_AUTHORITY = "https://key.jedutools.io/realms/JEduTools";

const oidcConfig = {
  authority: KEYCLOAK_AUTHORITY,
  client_id: "jedutools-portal",
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
