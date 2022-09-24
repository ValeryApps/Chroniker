import React from "react";
import { PulseLoader } from "react-spinners";

const ActivationForm = ({ type, text, header, loading }) => {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`"popup_header" ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          <h3> {header}</h3>
        </div>
        <div className="popup_message">{text}</div>
        <PulseLoader color="teal" size={30} loading={loading} />
      </div>
    </div>
  );
};

export default ActivationForm;
