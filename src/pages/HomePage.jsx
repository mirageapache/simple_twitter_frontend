import { useAuth } from "context/AuthContext";
import { useEffect } from "react";

const HomePage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  return <div>HomePage</div>;
};

export default HomePage;
