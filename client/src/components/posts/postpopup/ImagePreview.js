import React, { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

const ImagePreview = ({
  text,
  setText,
  user,
  images,
  setImages,
  setShowPrev,
  setError,
}) => {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/jpg" &&
        img.type !== "image/png" &&
        img.type !== "image/gif" &&
        img.type !== "image/webp"
      ) {
        setError(`${img.name} format is unsupported`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} too big! it should be lest than 5mb`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (ev) => {
        setImages((imgs) => [...imgs, ev.target.result]);
      };
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground
        text={text}
        setText={setText}
        user={user}
        type2={true}
      />
      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/gif, image/png, image/webp"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length > 0 ? (
          <div className="add_pics_inside p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon "> </i>Edit
              </button>
              <button
                className="hover1"
                onClick={() => imageInputRef.current.click()}
              >
                <i className="addPhoto_icon "> </i>Add Photo/Videos
              </button>
            </div>
            <div className="small_white_circle" onClick={() => setImages([])}>
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length === 6
                  ? "preview6"
                  : images.length > 0 && images.length % 2 === 0
                  ? "preview6"
                  : "preview6 single"
              }
            >
              {images.map((image, index) => (
                <img src={image} key={index} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside">
            <div
              className="small_white_circle"
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => imageInputRef.current.click()}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
