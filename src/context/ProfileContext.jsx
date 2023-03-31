import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNoti } from "context/NotiContext";

// api

const defaultProfile = {
  //   data
  // 方法
};

const ProfileContext = createContext(defaultProfile);

export const useRecommend = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <ProfileContext.Provider value={{}}>{children}</ProfileContext.Provider>
  );
};
