import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getReplies } from "../../functions/post";
import CreateReply from "../reply/CreateReply";
import Reply from "../reply/Reply";

export default function Comment({ comment }) {
  const [isCreateReply, setIsCreateReply] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const data = await getReplies(comment._id, user.token);
      setReplies(data);
    };
    fetchReplies();
  }, [comment, user]);
  return (
    <div className="comment">
      <Link to={`profile/${comment?.commentBy.username}`}>
        <img src={comment?.commentBy.picture} alt="" className="comment_img" />
      </Link>

      <div className="comment_col">
        <div className="comment_wrap">
          <Link
            to={`profile/${comment?.commentBy.username}`}
            className="comment_name"
          >
            {comment?.commentBy.first_name} {comment?.commentBy.last_name}
          </Link>
          <div className="comment_text">{comment?.comment}</div>
        </div>
        {comment?.image && (
          <img src={comment?.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span
            onClick={() => setIsCreateReply((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            Reply
          </span>
          {isCreateReply && (
            <CreateReply
              commentId={comment?._id}
              replies={replies}
              setReplies={setReplies}
            />
          )}
          <span>
            <Moment fromNow interval={30}>
              {comment?.commentAt}
            </Moment>
          </span>
        </div>
        {replies.map((reply, index) => (
          <Reply reply={reply} key={index} />
        ))}
      </div>
    </div>
  );
}
