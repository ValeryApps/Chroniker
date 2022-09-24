import { useRef, useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import Error from "../Error";
import { uploadImages } from "../../helpers/uploadImages";
import { createPost } from "../../functions/post";

import { updateUserCoverPic } from "../../functions/user";
import getCroppedImg from "../../helpers/getCroppedImg";
import { PulseLoader } from "react-spinners";
import OldCovers from "./OldCovers";

const Cover = ({
  cover,
  menuShown,
  setMenuShown,
  user,
  coverRef,
  itIsMe,
  photos,
}) => {
  const [error, setError] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(1);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState();
  const [showSelect, setShowSelect] = useState(false);
  const cover_imgRef = useRef(null);
  const hightRef = useRef(null);
  const inputRef = useRef(null);

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
      setCoverPicture(ev.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setCoverPicture(img);
          setZoom(1);
          setCrop({ x: 0, y: 0 });
        } else {
          return img;
        }
      } catch (error) {}
    },
    [croppedAreaPixels, coverPicture, setCoverPicture]
  );

  const updateCoverPicture = async () => {
    setLoading(true);
    try {
      let img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user?.username}/Cover_pictures`;
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const response = await uploadImages(formData, path, user?.token);

      const result = await updateUserCoverPic(response[0].url, user?.token);
      if (result.status === "ok") {
        const res = await createPost(
          user.id,
          user.token,
          null,
          null,
          response,
          "cover"
        );
        if (res.status === "ok") {
          cover_imgRef.current.src = response[0].url;
          setCoverPicture("");
        } else {
          setError(res);
        }
      } else {
        setError(result);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setWidth(hightRef.current.clientWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);
  return (
    <div className="profile_cover" ref={hightRef}>
      {coverPicture && (
        <Cropper
          image={coverPicture}
          crop={crop}
          zoom={zoom}
          aspect={width / 350}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={true}
          objectFit="horizontal-cover"
        />
      )}
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button
              className="blue_btn"
              onClick={() => updateCoverPicture("show")}
              disabled={loading}
            >
              {loading ? "Saving" : "Save Changes"}
              {loading && (
                <PulseLoader
                  color="white"
                  size={3}
                  style={{ marginTop: "3px" }}
                />
              )}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={handleImage}
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      />
      {error && (
        <div className="comment_error" style={{ height: "200px " }}>
          <Error error={error} setError={() => setError("")} />
        </div>
      )}
      {cover && <img src={cover} alt="" className="cover" ref={cover_imgRef} />}
      {itIsMe && (
        <div className="update_cover_wrapper" ref={coverRef}>
          <div
            className="open_cover_update"
            onClick={() => setMenuShown((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {menuShown && (
            <div className="open_cover_menu" ref={coverRef}>
              <div
                className="open_cover_menu_item"
                onClick={() => {
                  setShowSelect(true);
                  setMenuShown(false);
                }}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload photo
              </div>
            </div>
          )}
        </div>
      )}
      {showSelect && (
        <div className="old_pictures">
          <OldCovers
            setShowSelect={setShowSelect}
            user={user}
            photos={photos}
            setCoverPicture={setCoverPicture}
          />
        </div>
      )}
    </div>
  );
};

export default Cover;
