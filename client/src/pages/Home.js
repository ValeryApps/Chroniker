import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatePost from "../components/createPost";
import Post from "../components/posts/Post";
import PostPopup from "../components/posts/postpopup/PostPopup";
import { fetch_posts, fetch_posts_per_category } from "../functions/post";
import { FETCH_POSTS } from "../reducers/postReducer";
import { categories } from "../data/categories";
import { fetch_user_groups } from "../functions/group";
import { Left } from "../components/home/Left";
import { Right } from "../components/home/Right";
import "./home.css";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { posts } = useSelector((state) => ({ ...state.post }));
  const dispatch = useDispatch();
  const getPostsPerCategory = async (cat) => {
    try {
      const data = await fetch_posts_per_category(user?.token, cat);
      // console.log(data);
      dispatch({ type: FETCH_POSTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllPosts = async () => {
    try {
      const data = await fetch_posts(user?.token);
      dispatch({ type: FETCH_POSTS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetch_posts(user?.token);
        dispatch({ type: FETCH_POSTS, payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [user, dispatch]);
  useEffect(() => {
    const getUserGroups = async () => {
      const { data } = await fetch_user_groups(user?.token);
      setGroups(data);
    };
    getUserGroups();
  }, [user]);

  return (
    <Container sx={{ marginTop: "4rem" }}>
      {visible && <PostPopup user={user} setVisible={setVisible} />}
      <Grid container spacing={3}>
        <Left
          categories={categories}
          user={user}
          getAllPosts={getAllPosts}
          getPostsPerCategory={getPostsPerCategory}
          groups={groups}
        />
        <Grid
          item
          xs={12}
          md={6}
          // // className="home_middle"
          // sx={{ overflow: "scroll" }}
        >
          <div style={{ marginBottom: 6 }}>
            <CreatePost user={user} setVisible={setVisible} />
          </div>
          {posts?.map((post) => (
            <div key={post._id}>
              <Post post={post} user={user} />
            </div>
          ))}
        </Grid>
        <Right />
      </Grid>
    </Container>
  );
};

export default Home;
