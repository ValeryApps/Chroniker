import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authenticated = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default Authenticated;
