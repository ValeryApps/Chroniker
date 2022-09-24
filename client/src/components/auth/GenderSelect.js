import React from "react";

const GenderSelect = ({ handleRegisterChange, genderError }) => {
  return (
    <div className="reg_col">
      <div className="reg_line_header">
        Gender <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{ marginBottom: `${genderError && "45px"}` }}
      >
        <label htmlFor="male">
          Male
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="custom">
          Custom
          <input
            type="radio"
            name="gender"
            id="custom"
            value="custom"
            onChange={handleRegisterChange}
          />
        </label>
        {genderError && (
          <div className="register_input_error">
            {genderError}
            <div className="error_arrow_bottom"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderSelect;
