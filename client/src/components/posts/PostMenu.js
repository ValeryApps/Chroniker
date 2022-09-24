import { useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { useClickOutside } from "../../helpers/clickOutside";
import { checkIncluded, delete_post, savePost } from "../../functions/post";
import { useDispatch, useSelector } from "react-redux";
// import { DELETE_POST } from "../../reducers/postReducer";

export default function PostMenu({
  postUserId,
  user,
  imagesLength,
  setShowMenu,
  itIsMe,
  postId,
}) {
  const [saved, setSaved] = useState(false);
  const menu = useRef(null);
  const { post } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useClickOutside(menu, () => setShowMenu(false));
  const test = postUserId === user?.id;
  useEffect(() => {
    const get = async () => {
      const data = await checkIncluded(postId, user.token);
      setSaved(data);
    };
    get();
  }, [postId, user]);
  const handleSavePost = async () => {
    try {
      await savePost(postId, user?.token);
      const data = await checkIncluded(postId, user.token);
      setSaved(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleDeletePost = async () => {
    try {
      const result = await delete_post(postId, user.token);
      // dispatch({ type: DELETE_POST, payload: result });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="scrollbar post_menu" ref={menu}>
      <ul>
        {postUserId === user?.id && (
          <MenuItem icon="pin_icon" title="Pin Post" />
        )}
        <div onClick={handleSavePost}>
          <MenuItem
            icon="save_icon"
            title={saved ? "unsave post" : "save post"}
            subtitle="Add this to your saved items."
          />
        </div>
        <div className="line"></div>
        {test && itIsMe && <MenuItem icon="edit_icon" title="Edit Post" />}
        {!test && (
          <MenuItem
            icon="turnOnNotification_icon"
            title="Turn on notifications for this post"
          />
        )}
        {imagesLength && <MenuItem icon="download_icon" title="Download" />}
        {imagesLength && (
          <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
        )}
        {test && itIsMe && (
          <MenuItem img="../../../icons/lock.png" title="Edit audience" />
        )}
        {test && itIsMe && (
          <MenuItem
            icon="turnOffNotifications_icon"
            title="Turn off notifications for this post"
          />
        )}
        {test && itIsMe && (
          <MenuItem icon="delete_icon" title="Turn off translations" />
        )}
        {test && itIsMe && <MenuItem icon="date_icon" title="Edit Date" />}
        {test && itIsMe && (
          <MenuItem icon="refresh_icon" title="Refresh share attachment" />
        )}
        {test && itIsMe && (
          <MenuItem icon="archive_icon" title="Move to archive" />
        )}
        {test && itIsMe && (
          <div onClick={handleDeletePost}>
            <MenuItem
              icon="trash_icon"
              title="Move to trash"
              subtitle="items in your trash are deleted after 30 days"
            />
          </div>
        )}
        {!test && <div className="line"></div>}
        {!test && (
          <MenuItem
            img="../../../icons/report.png"
            title="Report post"
            subtitle="i'm concerned about this post"
          />
        )}
      </ul>
    </div>
  );
}
