import React from "react";
// import { useMediaQuery } from "react-responsive";

const DateOfBirthSelect = ({
  handleRegisterChange,
  bDay,
  days,
  bMonth,
  months,
  bYear,
  years,
  dateError,
}) => {
  // const view539 = useMediaQuery({
  //   query: "(min-width:539px)",
  // });
  // const view850 = useMediaQuery({
  //   query: "(min-width:850px)",
  // });
  // const view1170 = useMediaQuery({
  //   query: "(min-width:1170px)",
  // });
  return (
    <div className="reg_col">
      <div className="reg_line_header">
        Date of Birth <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{ marginBottom: `${dateError && "75px"}` }}
      >
        <select name="bDay" onChange={handleRegisterChange} value={bDay}>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select name="bMonth" onChange={handleRegisterChange} value={bMonth}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select name="bYear" onChange={handleRegisterChange} value={bYear}>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        {dateError && (
          <div className="register_input_error">
            {dateError}
            <div className="error_arrow_bottom"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateOfBirthSelect;
