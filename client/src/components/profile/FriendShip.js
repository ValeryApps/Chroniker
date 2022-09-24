import React, { useEffect, useRef, useState } from "react";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
  follow,
  sendRequest,
  unfollow,
  unfriend,
} from "../../functions/user";
import { useClickOutside } from "../../helpers/clickOutside";

const FriendShip = ({ friendship_status, token, profileId }) => {
  const [friendship, setFriendship] = useState(friendship_status);
  useEffect(() => {
    setFriendship(friendship_status);
  }, [friendship_status]);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);
  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, sentRequest: true, following: true });
    await sendRequest(profileId, token);
  };
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, sentRequest: false, following: false });
    await cancelRequest(profileId, token);
  };
  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, token);
  };
  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, token);
  };
  const acceptRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      sentRequest: false,
      receivedRequest: false,
    });
    await acceptRequest(profileId, token);
  };
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      sentRequest: false,
      receivedRequest: false,
    });
    await unfriend(profileId, token);
  };
  const deleteRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      sentRequest: false,
      receivedRequest: false,
    });
    await deleteRequest(profileId, token);
  };

  return (
    <div className="friendship">
      {friendship?.friend ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friend</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => followHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={() => unfriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.sentRequest &&
        !friendship?.friend &&
        !friendship?.receivedRequest && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.sentRequest ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler()}>
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.receivedRequest && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={menu1}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequestHandler()}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => deleteRequestHandler()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
        <button className={friendship?.friend ? "blue_btn" : "gray_btn"}>
          <img
            src="../../../icons/message.png"
            className={friendship?.friend ? "invert" : ""}
            alt=""
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default FriendShip;
