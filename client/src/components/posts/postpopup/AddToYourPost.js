import React from "react";
import { Dots, Feeling, Photo } from "../../../svg";

const AddToYourPost = ({ setShowPrev }) => {
  return (
    <div className="addToYourPost">
      <div className="addTo_text">Add Post</div>
      <div
        className="post_header_right hover"
        onClick={() => setShowPrev(true)}
      >
        <Photo color="#45bd62" />
      </div>
      <div className="post_header_right hover1">
        <i className="tag_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Feeling color="#f7b920" />
      </div>
      <div className="post_header_right hover1">
        <i className="maps_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <i className="microphone_icon"></i>
      </div>
      <div className="post_header_right hover1">
        <Dots color="65676b" />
      </div>
    </div>
  );
};

export default AddToYourPost;
