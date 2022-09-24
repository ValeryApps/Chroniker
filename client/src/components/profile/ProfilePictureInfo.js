import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FriendShip from "./FriendShip";

import ProfilePicture from "./ProfilePicture";

const ProfilePictureInfo = ({
  profile,
  itIsMe,
  photos,
  user,
  otherName,
  friendship_status,
}) => {
  const [show, setShow] = useState(false);

  const picRef = useRef(null);
  return (
    <div className="profile_img_wrap">
      {show && (
        <ProfilePicture
          setShow={setShow}
          picRef={picRef}
          photos={photos}
          user={user}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            ref={picRef}
            className="profile_w_bg"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          {itIsMe && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile?.first_name} {profile?.last_name}
            <div className="othername">({otherName})</div>
          </div>
          <div className="profile_friend_count">
            {profile?.friends && (
              <div className="profile_card_count">
                {profile?.friends?.length === 0
                  ? ""
                  : profile?.friends?.length === 1
                  ? "1 friend"
                  : `${profile?.friends?.length} friends`}
              </div>
            )}
          </div>
          <div className="profile_friend_imgs">
            {profile?.friends?.slice(0, 9).map((friend, index) => (
              <Link to={`/profile/${friend.username}`} key={friend._id}>
                <img
                  src={friend.picture}
                  alt=""
                  title={friend.first_name}
                  style={{
                    transform: `translateX(${-index * 5}px)`,
                    zIndex: index,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {itIsMe ? (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to Story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon invert"></i>
            <span>Edit profile</span>
          </div>
        </div>
      ) : (
        <FriendShip
          profileId={profile?._id}
          token={user?.token}
          friendship_status={friendship_status}
        />
      )}
    </div>
  );
};

export default ProfilePictureInfo;
