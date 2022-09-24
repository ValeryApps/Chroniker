import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import PulseLoader from "react-spinners/PulseLoader";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch } from "react-redux";
import { uploadImages } from "../../helpers/uploadImages";
import { updateUserProfilePic } from "../../functions/user";
import { createPost } from "../../functions/post";
// import { UPDATE_PROFILE_PICTURE } from "../../reducers/userReducer";
import Cookies from "js-cookie";

function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  picRef,
  user,
}) {
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(1);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  const dispatch = useDispatch();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setImage(img);
          setZoom(1);
          setCrop({ x: 0, y: 0 });
        } else {
          return img;
        }
      } catch (error) {}
    },
    [croppedAreaPixels, image, setImage]
  );
  const zoomOut = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };

  const updateProfilePicture = async () => {
    setLoading(true);
    try {
      let img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user?.username}/profile_pictures`;
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const response = await uploadImages(formData, path, user?.token);

      const result = await updateUserProfilePic(response[0].url, user?.token);
      if (result.status === "ok") {
        const res = await createPost(
          user.id,
          user.token,
          description,
          null,
          response,
          "profilePicture"
        );
        if (res.status === "ok") {
          // dispatch({
          //   type: UPDATE_PROFILE_PICTURE,
          //   payload: response[0].url,
          // });
          picRef.current.style.backgroundImage = `url(${response[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: response[0].url,
            })
          );
          setImage("");
        } else {
          setError(res);
        }
      } else {
        setError(result);
      }
      setLoading(false);
      setShow(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="post_box update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle" onClick={zoomOut}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.2}
            ref={sliderRef}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle" onClick={zoomIn}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfilePicture()}
        >
          {loading ? "Saving" : "Save"}
          {loading && (
            <PulseLoader color="white" size={3} style={{ marginTop: "3px" }} />
          )}
        </button>
      </div>
    </div>
  );
}

export default UpdateProfilePicture;
