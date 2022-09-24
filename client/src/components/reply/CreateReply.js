import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
// import Error from "../Error";
import { reply } from "../../functions/post";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../helpers/uploadImages";
import { PulseLoader } from "react-spinners/";

const CreateReply = ({ commentId, setReplies, replies }) => {
  const [picker, showPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);
  const selectImage = useRef(null);

  const handleImages = (e) => {
    let file = e.target.files[0];

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format is unsupported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} too large! Image should be lest than 5mb`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      setImage(ev.target.result);
    };
  };

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const { user } = useSelector((state) => ({ ...state.auth }));

  const handleReply = async (e) => {
    try {
      if (e.key === "Enter") {
        if (image !== "") {
          setLoading(true);
          const img = dataURItoBlob(image);
          const path = `${user?.username}/posts/${commentId}/comment_image`;
          const formData = new FormData();
          formData.append("path", path);
          formData.append("file", img);
          const replyImgs = await uploadImages(formData, path, user.token);
          const rep = await reply(
            commentId,
            user.token,
            text,
            replyImgs[0].url
          );
          setReplies((prev) => [...prev, rep]);
          setLoading(false);
          setText("");
          setImage("");
        } else {
          setLoading(true);
          const rep = await reply(commentId, user?.token, text, "");
          setReplies((prev) => [...prev, rep]);
          setLoading(false);
          setText("");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && <Picker onEmojiClick={handleEmoji} />}
          <input
            type="file"
            hidden
            ref={selectImage}
            accept="image/jpeg, image/jpg, image/gif, image/png, image/webp"
            onChange={handleImages}
          />

          {error && (
            <div className="comment_error">
              {/* <Error error={error} setError={() => setError("")} /> */}
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Write a comment"
            onKeyUp={handleReply}
          />
          <div className="spin_loader">
            <PulseLoader color="#af9af1" loading={loading} />
          </div>
          <div
            className="comment_circle_icon circle hover2"
            onClick={() => showPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon circle hover2"
            onClick={() => selectImage.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon circle hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon circle hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {image && (
        <div className="comment_image_preview">
          <img src={image} alt="" />
          <div
            className="close_circle"
            title="remove this image"
            onClick={() => setImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReply;
