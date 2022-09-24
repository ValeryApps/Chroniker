import React from "react";

const Error = ({ error, setError }) => {
  return (
    <div className="post_error">
      {error}
      <button onClick={() => setError("")}>Try again</button>
    </div>
  );
};

export default Error;
