import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import "./post.css";
import { createMarkup } from "../../helpers/parseHTML";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import { getComments, getReacts, reactToPost } from "../../functions/post";
import ReactTimeAgo from "react-time-ago";
import ReactPopup from "./ReactPopup";

export default function Post({ post, user }) {
  // const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [allReacts, setAllReacts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [comments, setComments] = useState([]);
  const [react, setReact] = useState("");
  const [userReacted, setUserReacted] = useState(false);

  let partOne;
  let partTwo;
  if (post?.text.length > 200) {
    const index = post?.text.indexOf("</p>");
    partOne = post?.text.substring(0, index) + "...";
    partTwo = post?.text.substring(index);
  } else {
    partOne = post?.text;
  }
  useEffect(() => {
    const fetchComment = async () => {
      const data = await getComments(post._id, user?.token);
      setComments(data);
    };
    fetchComment();
  }, [post, user]);
  console.log(post);
  useEffect(() => {
    const getReact = async () => {
      const data = await getReacts(post?._id, user?.token);
      setReact(data?.react?.react);
      setUserReacted(data?.react?.reactBy === user.userId);
      setAllReacts(data?.allReacts);
    };
    getReact();
  }, [post, user]);

  const handleReactToPost = async (type) => {
    try {
      const res = await reactToPost(type, post?._id, user?.token);
      setAllReacts((prev) => [...prev, res?.react]);
      setReact(res?.react);
      setUserReacted((prev) => !prev);
    } catch (error) {}
  };

  const reactArray = allReacts?.reduce((group, react) => {
    const key = react?.react;
    group[key] = group[key] || [];
    group[key].push(react);
    return group;
  }, {});
  const reacts = [
    { react: "like", count: reactArray?.like ? reactArray?.like.length : 0 },
    { react: "love", count: reactArray?.love ? reactArray?.love.length : 0 },
    { react: "haha", count: reactArray?.haha ? reactArray?.haha.length : 0 },
    { react: "wow", count: reactArray?.wow ? reactArray?.wow.length : 0 },
    { react: "angry", count: reactArray?.angry ? reactArray?.angry.length : 0 },
  ];

  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post?.user?.first_name?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.user?.first_name + " " + post?.user?.last_name}
        subheader={
          <ReactTimeAgo date={new Date(post?.createdAt)} locale="en-US" />
        }
      />
      {post?.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post?.background})` }}
        >
          <div
            className="post_bg_text"
            dangerouslySetInnerHTML={createMarkup(post?.text)}
          ></div>
        </div>
      ) : post?.type === null ? (
        <>
          <div className={`${showMore ? "scroll scrollbar" : "post_text"}`}>
            <div dangerouslySetInnerHTML={createMarkup(partOne)}></div>
            {post?.text.length > 200 && showMore && (
              <div dangerouslySetInnerHTML={createMarkup(partTwo)}></div>
            )}
          </div>

          {post?.images && post?.images.length ? (
            <div
              className={
                post?.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post?.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post?.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post?.images.length - 5}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post?.user.cover} alt="" />
          </div>
          <img
            src={post?.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <div className="cover_updated_bg">
            {post?.images && <img src={post?.images[0].url} alt="" />}
          </div>
        </div>
      )}

      {post?.text.length > 200 && (
        <div className="show_more" onClick={() => setShowMore((prev) => !prev)}>
          {!showMore ? (
            <div>
              <span>Show more</span>
              <KeyboardArrowDownIcon />
            </div>
          ) : (
            <div>
              <span>Show less</span>

              <KeyboardControlKeyIcon />
            </div>
          )}
        </div>
      )}
      <div className="post_actions">
        <ReactPopup
          visible={visible}
          setVisible={setVisible}
          handleReactToPost={handleReactToPost}
        />
        <div
          className="post_action hover1"
          onMouseOver={() =>
            setTimeout(() => {
              setVisible(true);
            }, 500)
          }
          onMouseLeave={() =>
            setTimeout(() => {
              setVisible(false);
            }, 1500)
          }
          onClick={() => handleReactToPost(!react ? "like" : react)}
        >
          {userReacted ? (
            <div
              className="small_icon"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <img
                src={`../../../reacts/${react}.svg`}
                alt=""
                style={{ width: "16px", height: "16px" }}
              />
              <span
                title={
                  reacts?.length === 1
                    ? `${reacts?.length} person reacted to this post`
                    : `${reacts?.length} people reacted to this post`
                }
              >
                {react}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "3px" }}>
              {" "}
              <i className="like_icon"></i>
              <span title="Nobody has reacted to this post yet. Be the first">
                Like
              </span>
            </div>
          )}
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      {comments &&
        comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      <div className="comments_wrap">
        <div className="comments_order">
          <CreateComment postId={post?._id} setComments={setComments} />
        </div>
      </div>
      {showMenu && (
        <PostMenu
          user={post.user}
          postUserId={post?.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          //  itIsMe={itIsMe}
          postId={post._id}
        />
      )}
    </Card>
  );
}
