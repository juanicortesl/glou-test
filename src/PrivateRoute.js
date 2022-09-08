import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children } = props;
  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  return isLoggedIn ? <>{children}</> : <Navigate replace={true} to="/login" />;
};

export default PrivateRoute;
