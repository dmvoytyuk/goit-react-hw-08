import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const PrivateRoute = ({ component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
