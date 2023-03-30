import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import LoadingMes from "components/LoadingMes";
import { useNavigate } from "react-router";


const HomePage = () => {
  // const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('homepage execute logout');
    navigate('login')
    // logout();
  }, []);

  return (
    <div>
      <LoadingMes />
    </div>
  );
};

export default HomePage;
