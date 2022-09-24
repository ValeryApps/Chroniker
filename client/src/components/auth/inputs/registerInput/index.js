import { ErrorMessage, useField } from "formik";
import React from "react";
import { useMediaQuery } from "react-responsive";
import "./registerInput.css";

const RegisterInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  const view539 = useMediaQuery({
    query: "(min-width:539px)",
  });
  // const view850 = useMediaQuery({
  //   query: "(min-width:850px)",
  // });
  const view1170 = useMediaQuery({
    query: "(min-width:1170px)",
  });
  return (
    <div className="register_input_wrap">
      {/* {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "register_input_error register_input_error_desktop" : "register_input_error"
          }
          style={{ transform: "translateY(4px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={desktopView ? "error_arrow_left" : "error_arrow_top"}
          ></div>
        </div>
      )} */}

      <input
        className={
          meta.touched && meta.error ? "register_input_error_border" : ""
        }
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
        style={{
          width: `${
            view539 &&
            (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view539 && (field.name === "password" || field.name === "email")
              ? "370px"
              : "300px"
          }`,
        }}
      />
      {meta.touched && meta.error && (
        <div
          className={
            view1170
              ? "register_input_error register_input_error_desktop"
              : "register_input_error"
          }
          style={{
            transform: "translateY(-3px)",
            left:
              view1170 && field.name === "first_name"
                ? "-195px"
                : view1170 && field.name === "last_name"
                ? "195px"
                : view1170 &&
                  field.name !== "last_name" &&
                  field.name !== "first_name"
                ? "-380px"
                : "",
          }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              view1170 && field.name !== "last_name"
                ? "error_arrow_left"
                : view1170 && field.name === "last_name"
                ? "error_arrow_right"
                : "error_arrow_bottom"
            }
            style={{
              left: view1170 && field.name === "first_name" ? "185px" : "",
            }}
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <img
          src="icons/3_error_icon.png"
          alt=""
          width="20px"
          height="20px"
          // style={{ top: !bottom && !desktopView && "62%" }}
        />
      )}
    </div>
  );
};

export default RegisterInput;
