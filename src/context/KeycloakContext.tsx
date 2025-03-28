import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";
import type { User } from "oidc-client-ts";
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;


interface KeycloakContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasTriedSignin: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  user?: User | null;
}

const initialContextValue: KeycloakContextType = {
  isAuthenticated: false,
  isLoading: true,
  hasTriedSignin: false,
  handleLogin: async () => {},
  handleLogout: () => {},
};

const KeycloakContext = createContext<KeycloakContextType>(initialContextValue);

/**
 * @deprecated
 * KeycloakContext를 사용하는 대신 hooks/useKeycloak을 사용하세요.
 */
export const KeycloakProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  const handleLogin = async () => {
    if (
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin
    ) {
      setHasTriedSignin(true);
      auth.signinRedirect();
    }
  };

  const handleLogout = () => void auth.signoutRedirect();

  // 매직링크로 접속시 직접 로그인 핸들링
  useEffect(() => {
    if (hasAuthParams()) {
      handleLogin();
    }
  }, [
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    hasTriedSignin,
  ]);

  useEffect(() => {
    const handleError = () => {
      if (!auth.error) return;
      console.error(auth.error);

      // 매직링크 로그인시 PKCE 미지원으로 실패, Keycloak에 세션이 생성되므로 Redirect 방식으로 로그인 처리
      if (
        auth.error.message ===
        "PKCE code verifier specified but challenge not present in authorization"
      )
        return;

      if (auth.error.message === "No matching state found in storage") {
        alert(
          "로그인 요청을 보낸 브라우저와, 로그인 링크를 통해 접속한 브라우저가 다를 경우 로그인에 실패할 수 있습니다."
        );
        return;
      }

      alert(
        `로그인에 문제가 있습니다. 관리자에게 문의 바랍니다.\n문의: ${ADMIN_EMAIL}`
      );
      setHasTriedSignin(false);
    };

    handleError();
  }, [auth.error]);

  const user = auth.user;
  return (
    <KeycloakContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        hasTriedSignin,
        handleLogin,
        handleLogout,
        user,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

/**
 * @deprecated
 * KeycloakContext를 사용하는 대신 hooks/useKeycloak을 사용하세요.
 */
// KeycloakContext 사용을 위한 커스텀 훅
export const useKeycloak = () => useContext(KeycloakContext);
