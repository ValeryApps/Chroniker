import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Unauthenticated = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Unauthenticated;
