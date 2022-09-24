import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/posts/`;
const likeUrl = `${process.env.REACT_APP_API_URL}/like`;
const savePostUrl = `${process.env.REACT_APP_API_URL}/savePost/`;
const reactUrl = `${process.env.REACT_APP_API_URL}/react`;
const commentUrl = `${process.env.REACT_APP_API_URL}/comment`;
const replyUrl = `${process.env.REACT_APP_API_URL}/reply`;
const checkUrl = `${process.env.REACT_APP_API_URL}/check`;
const deleteUrl = `${process.env.REACT_APP_API_URL}/deletePost`;

export const createPost = async (
  user,
  token,
  text,
  background,
  images,
  type,
  category
) => {
  try {
    const { data } = await axios.post(
      url,
      { user, text, background, images, type, category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};
export const fetch_posts = async (token) => {
  let data;
  try {
    if (!token) {
      data = await axios.get(`${url}forUnsubscribed`);
    } else {
      data = await axios.get(`${url}all_posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return data.data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const fetch_posts_per_category = async (token, category) => {
  try {
    const { data } = await axios.get(`${url}${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const savePost = async (postId, token) => {
  try {
    const { data } = await axios.put(
      `${savePostUrl}${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactToPost = async (react, postId, token) => {
  try {
    const { data } = await axios.post(
      reactUrl,
      { react, postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(`${reactUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const comment = async (postId, token, comment, image) => {
  try {
    const { data } = await axios.post(
      commentUrl,
      { comment, image, postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getComments = async (postId, token) => {
  try {
    const { data } = await axios.get(`${commentUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const checkIncluded = async (postId, token) => {
  try {
    const { data } = await axios.get(`${checkUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const delete_post = async (postId, token) => {
  try {
    const { data } = await axios.delete(`${deleteUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const reply = async (commentId, token, reply, image) => {
  try {
    const { data } = await axios.post(
      replyUrl,
      { reply, image, commentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getReplies = async (commentId, token) => {
  try {
    const { data } = await axios.get(`${replyUrl}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const like_post = async (postId, token) => {
  const data = await axios.put(
    `${likeUrl}/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
