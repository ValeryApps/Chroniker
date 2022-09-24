import { useState } from "react";
import "./auth.css";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
const Auth = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <LoginForm setVisible={setVisible} />
      {visible && <RegisterForm setVisible={setVisible} />}
    </div>
  );
};

export default Auth;
