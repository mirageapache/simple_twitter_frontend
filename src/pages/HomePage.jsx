import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import LoadingMes from "components/LoadingMes";
import { useNavigate } from "react-router";


const HomePage = () => {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const{ isAuthenticated } = useAuth();

  useEffect(() => {
    if(isAuthenticated){
      navigate('main');
    }
    else{
      navigate('login')
    }
  }, [navigate, isAuthenticated]);

  return (
    <div>
      <LoadingMes />
    </div>
  );
};

export default HomePage;
