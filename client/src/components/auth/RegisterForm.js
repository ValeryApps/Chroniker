import { Form, Formik } from "formik";
import React, { useState } from "react";
import RegisterInput from "./inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { register } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";

const url = `${process.env.REACT_APP_API_URL}/register`;

const RegisterForm = ({ setVisible }) => {
  const [dateError, setDateError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [genderError, setGenderError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfo);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setDateError(dateError);
    setGenderError(genderError);
  };
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your first name?")
      .min(2, "First name must be between 2 and 16 character long")
      .max(16, "First name must be between 2 and 16 character long")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("What is your last surname?")
      .min(2, "Surname must be between 2 and 16 character long")
      .max(16, "Surname name must be between 2 and 16 character long"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    // bDay: Yup.string().required(),
    // bYear: Yup.string().required(),
    // bMonth: Yup.string().required(),
    // gender: Yup.string().required(),
  });
  const submitRegister = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(url, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      setLoading(false);
      setError("");
      dispatch(register(data));
      setSuccess("Registration was successful");
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  const handleSubmit = () => {
    const current_date = new Date();
    const picked_date = new Date(bYear, bMonth - 1, bDay);
    const age_14 = new Date(1970 + 10, 0, 1);
    const age_90 = new Date(1970 + 90, 0, 1);
    const age = current_date - picked_date;

    if (age < age_14) {
      setDateError(
        "It looks like you've entered the wrong info. Please make sure that you use your real birth date"
      );
      // setGenderError("");
    } else if (age > age_90) {
      setDateError(
        "It looks like you've entered the wrong info. Please make sure that you use your real birth date"
      );

      // setGenderError("");
    } else if (gender === "") {
      setGenderError("Please specify your gender");
      setDateError("");
    } else {
      setDateError("");
      setGenderError("");
      submitRegister();
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It is very quick and easy</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          enableReinitialize
          validationSchema={registerValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  className="first_name"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleRegisterChange}
                  value={first_name}
                />
                <RegisterInput
                  className="last_name"
                  type="text"
                  name="last_name"
                  placeholder="surname"
                  onChange={handleRegisterChange}
                  value={last_name}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  name="email"
                  placeholder="Mobile number or Email Address"
                  onChange={handleRegisterChange}
                  value={email}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  name="password"
                  placeholder="New Password"
                  onChange={handleRegisterChange}
                  value={password}
                />
              </div>
              <DateOfBirthSelect
                bDay={bDay}
                bMonth={bMonth}
                bYear={bYear}
                months={months}
                years={years}
                days={days}
                dateError={dateError}
                handleRegisterChange={handleRegisterChange}
              />
              {/* reg-col */}
              <GenderSelect
                genderError={genderError}
                handleRegisterChange={handleRegisterChange}
              />
              {/* register */}
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and
                <span>Cookie Policy.</span> You may receive SMS notifications
                from un and opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  className="blue_btn open_signup"
                  disabled={loading}
                >
                  {loading ? " Signing you Up" : "Sign Up"}
                  {loading && <PulseLoader color="white" />}
                </button>
              </div>
              {/* <br /> */}
              {error && <h6 className="register_error">{error}</h6>}
              {success && <h6 className="register_success">{success}</h6>}
            </Form>
          )}
        </Formik>
      </div>
      {/* register */}
    </div> /*blur*/
  );
};

export default RegisterForm;
