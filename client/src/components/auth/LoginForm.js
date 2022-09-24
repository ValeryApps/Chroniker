import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/auth/auth.css";
import LoginInput from "./inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { login } from "../../reducers/authReducer";

const url = `${process.env.REACT_APP_API_URL}/login`;
const loginInfo = {
  email: "",
  password: "",
};
const LoginForm = ({ setVisible }) => {
  const [_login, _setLogin] = useState(loginInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email, password } = _login;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    _setLogin({ ..._login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required").min(6),
  });
  const submitLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(url, _login);
      setLoading(false);
      dispatch(login(data));
      cookies.set("user", JSON.stringify(data), { expires: 1 });
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrapper">
      <div className="login_wrap">
        <div className="login_1">
          <h1>2Bvocal</h1>
          <span>
            1tellect helps you share your thoughts with people around the world
          </span>
        </div>
        <div className="login_2">
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={submitLogin}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    placeholder="Email or phone number"
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                  />
                  <LoginInput
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    bottom
                  />
                  <button type="submit" className="blue_btn" disabled={loading}>
                    {loading ? "Logging you in" : "Log In"}
                    {loading && <PulseLoader color="white" />}
                  </button>
                </Form>
              )}
            </Formik>
            {error && <h6 className="login_error">{error}</h6>}
            <Link to="/reset" className="forgot_password">
              forgotten password?
            </Link>
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
              onClick={() => setVisible(true)}
            >
              Create Account
            </button>
          </div>
          <Link to="/" className="sign_extra">
            <b>Create a page</b> for a celebrity, brand or business
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
