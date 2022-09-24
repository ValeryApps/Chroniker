import { useRef } from "react";
import { useClickOutside } from "../../helpers/clickOutside";

export default function OldCovers({
  photos,
  setCoverPicture,
  setShowSelect,
  user,
}) {
  const Ref = useRef(null);
  useClickOutside(Ref, () => setShowSelect(false));
  return (
    <div className="blur">
      <div className="post_box selectCoverBox" ref={Ref}>
        <div style={{ textAlign: "center" }}>
          <div
            className="small_circle"
            onClick={() => {
              setShowSelect(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShowSelect(false);
                    }}
                  />
                ))}
          </div>
          <div className="old_pictures">
            {photos &&
              photos
                .filter((img) => img.folder !== `${user.username}/post_images`)
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShowSelect(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
