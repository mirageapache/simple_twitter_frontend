import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import LoadingMes from "components/LoadingMes";

const HomePage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    return logout();
  }, [logout]);

  return (
    <div>
      <LoadingMes />
    </div>
  );
};

export default HomePage;
