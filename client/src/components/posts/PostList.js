import React, { useEffect, useState } from "react";
import { fetch_posts } from "../../functions/post";
import Post from "./Post";
const url = `${process.env.REACT_APP_API_URL}/posts/all_posts`;
const PostList = ({ user }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await fetch_posts(user.token);

      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts?.map((post) => (
        <div key={post._id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
