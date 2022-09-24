import axios from "axios";
import "./index.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import Cover from "../../components/profile/Cover";
import {
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
} from "../../reducers/profileReducer";
import { useClickOutside } from "../../helpers/clickOutside";
import ProfilePictureInfo from "../../components/profile/ProfilePictureInfo";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import CreatePost from "../../components/createPost/index";
import GridPost from "../../components/profile/GridPost";
import Post from "../../components/posts/Post";
import Photos from "../../components/profile/Photos";
import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_START,
  FETCH_PHOTOS_SUCCESS,
  initial_photo_State,
  photoReducer,
} from "../../reducers/photoReducer";
import Friends from "../../components/profile/Friends";
import Intro from "../../components/intro/intro";
import PostPopup from "../../components/posts/postpopup/PostPopup";

const url = `${process.env.REACT_APP_API_URL}`;

export default function Profile() {
  const navigate = useNavigate();
  const [menuShown, setMenuShown] = useState(false);
  const [otherName, setOtherName] = useState();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [visible, setVisible] = useState(false);
  let { username } = useParams();
  const coverRef = useRef(null);
  const [profile_posts, setProfile_post] = useState();

  useClickOutside(coverRef, () => {
    setMenuShown(false);
  });
  username = username === undefined ? user?.username : username;

  const { profile } = useSelector((state) => ({ ...state }));

  const { error, loading } = profile;
  const dispatch = useDispatch();
  const [{ photos, error_photos, loading_photos }, dispatch_photo] = useReducer(
    photoReducer,
    initial_photo_State
  );
  // const getProfile = async () => {
  //   dispatch({ type: FETCH_PROFILE_START });
  //   try {
  //     const { data } = await axios.get(`${url}/profile/${username}`, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });

  //     if (!data) {
  //       navigate("/profile");
  //     } else {
  //       // sorting the profile post
  //       const postData = data.posts.sort((a, b) => {
  //         return b.createdAt - a.createdAt;
  //       });
  //       setProfile_post(postData);
  //       dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
  //       getPhotos();
  //     }
  //   } catch (error) {
  //     dispatch({ type: FETCH_PROFILE_ERROR });
  //     console.log(error);
  //   }
  // };
  const getPhotos = async () => {
    dispatch_photo({ type: FETCH_PHOTOS_START });
    try {
      const { data } = await axios.post(
        `${url}/images`,
        { path: `${username}*`, max: 30, sort: "desc" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch_photo({ type: FETCH_PHOTOS_SUCCESS, payload: data });
    } catch (error) {
      dispatch_photo({ type: FETCH_PHOTOS_ERROR });
      console.log(error);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      dispatch({ type: FETCH_PROFILE_START });
      try {
        const { data } = await axios.get(`${url}/profile/${username}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!data) {
          navigate("/profile");
        } else {
          //sorting the profile post
          const postData = data.posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          setProfile_post(postData);
          dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data });
          getPhotos();
        }
      } catch (error) {
        dispatch({ type: FETCH_PROFILE_ERROR });
        console.log(error);
      }
    };

    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  useEffect(() => {
    setOtherName(profile?.profile?.details?.otherName);
  }, [profile]);
  const itIsMe = user?.username === username;

  // if (loading) {
  //   return <h3>Loading...</h3>;
  // }

  // if (error) {
  //   return <h3>There was an error</h3>;
  // }

  return (
    <div className="profile" style={{ marginBottom: "2rem" }}>
      <Header page="profile" />
      {visible && (
        <PostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          profile
          posts={profile_posts}
        />
      )}
      <div className="profile_top">
        <div className="profile_container">
          <Cover
            cover={profile?.profile?.cover}
            setMenuShown={setMenuShown}
            menuShown={menuShown}
            coverRef={coverRef}
            itIsMe={itIsMe}
            user={user}
            photos={photos.resources}
          />
          <ProfilePictureInfo
            profile={profile?.profile}
            itIsMe={itIsMe}
            photos={photos.resources}
            user={user}
            otherName={otherName}
            friendship_status={profile?.profile?.friendship}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
          </div>
          <div className="profile_grid">
            <div className="profile_left">
              <Intro
                user={user}
                itIsMe={itIsMe}
                detailss={profile?.profile?.details}
                setOtherName={setOtherName}
              />
              <Photos
                photos={photos}
                loading={loading_photos}
                error={error_photos}
              />
              <Friends friends={profile?.profile?.friends} />
              <div className="relative_fb_copyright">
                <Link to="/">Privacy </Link>
                <span>. </span>
                <Link to="/">Terms </Link>
                <span>. </span>
                <Link to="/">Advertising </Link>
                <span>. </span>
                <Link to="/">
                  Ad Choices <i className="ad_choices_icon"></i>{" "}
                </Link>
                <span>. </span>
                <Link to="/"></Link>Cookies <span>. </span>
                <Link to="/">More </Link>
                <span>. </span> <br />
                Meta © 2022
              </div>
            </div>
            <div className="profile_right">
              <CreatePost user={user} profile setVisible={setVisible} />
              <GridPost itIsMe={itIsMe} />
              <div className="posts">
                {profile_posts && profile_posts.length > 0 ? (
                  <>
                    {profile_posts?.map((post) => (
                      <Post
                        post={post}
                        key={post?._id}
                        user={user}
                        itIsMe={itIsMe}
                      />
                    ))}
                  </>
                ) : (
                  <div className="no_posts">No posts available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
