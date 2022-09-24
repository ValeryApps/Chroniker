import React, { useRef, useState } from "react";
import Error from "../Error";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useClickOutside } from "../../helpers/clickOutside";

const ProfilePicture = ({ setShow, picRef, photos, user }) => {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const closeRef = useRef(null);
  useClickOutside(closeRef, () => {
    setShow(false);
  });
  const handleImage = (e) => {
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

  return (
    <div className="blur">
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      />
      <div className="post_box pictureBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update Profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Update Photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon "></i>
              Add Frame
            </button>
          </div>
          {error && (
            <div className="comment_error">
              <Error error={error} setError={() => setError("")} />
            </div>
          )}
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>Your posts pictures</h4>
          <div className="old_pictures">
            {photos
              ?.filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              ?.map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setError={setError}
          setShow={setShow}
          picRef={picRef}
          user={user}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
