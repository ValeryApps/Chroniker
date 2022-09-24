import React from "react";
import { Link } from "react-router-dom";
import "./cat.css";

export const Category = ({ name, image, handleFetCategories }) => {
  return (
    <div className="cat_media" onClick={handleFetCategories}>
      <div className="cat_img">
        <img src={image} alt={name} width="100px" height="60px" />
      </div>
      <div className="cat_name">
        <span>{name}</span>
      </div>
    </div>
  );
};
