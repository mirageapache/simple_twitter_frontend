import { createContext, useState, useEffect, useContext } from "react";
import { checkLoginStatusAPI } from "api/auth";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};
const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("AuthToken");
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkLoginStatusAPI(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt_decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        payload,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          role: payload.role,
          account: payload.account,
          avatar: payload.avatar,
        },
        setLoginState: (result) => {
          const authToken = localStorage.getItem("AuthToken");
          if (result) {
            setIsAuthenticated(true);
            const tempPayload = jwt_decode(authToken);
            setPayload(tempPayload);
          } else {
            setIsAuthenticated(false);
            setPayload(null);
          }
        },
        logout: () => {
          localStorage.removeItem("AuthToken");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
