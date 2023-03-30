import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import LoadingMes from "components/LoadingMes";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      return navigate("/main");
    }
  }, [navigate, logout, isAuthenticated]);

  return (
    <div>
      <LoadingMes />
    </div>
  );
};

export default HomePage;
