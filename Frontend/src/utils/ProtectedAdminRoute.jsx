import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";

const ProtectedAdminRoute = ({ children }) => {
  //   const { user, loading } = useContext(UserContext);
  const { authenticated, user } = useContext(Context);

  if (!authenticated) return <Navigate to="/login" />;

  // Se o usuário não estiver logado ou não for admin
  if (!user || user.tipo !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
