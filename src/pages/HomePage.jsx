import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, [navigate]);

  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
