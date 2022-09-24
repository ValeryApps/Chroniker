import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Reply = ({ reply }) => {

  return (
    <div className="comment">
      <Link to={`profile/${reply?.repliedBy?.username}`}>
        <img src={reply?.repliedBy?.picture} alt="" className="comment_img" />
      </Link>

      <div className="comment_col">
        <div className="comment_wrap">
          <Link
            to={`profile/${reply?.repliedBy?.username}`}
            className="comment_name"
          >
            {reply?.repliedBy?.first_name} {reply?.repliedBy?.last_name}
          </Link>
          <div className="comment_text">{reply?.reply}</div>
        </div>
        {reply?.image && (
          <img src={reply?.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span>
            <Moment fromNow interval={30}>
              {reply?.repliedAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reply;
