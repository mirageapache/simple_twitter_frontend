import { useAuth } from "context/AuthContext";
import { useEffect } from "react";

import LoadingMes from "components/LoadingMes";

const HomePage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    console.log('homepage execute logout');
    logout();
  }, [logout]);

  return (
    <></>
    // <div>
    //   <LoadingMes />
    // </div>
  );
};

export default HomePage;
