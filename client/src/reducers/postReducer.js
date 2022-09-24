// import { createSlice } from "@reduxjs/toolkit";

export const CREATE_POST = "CREATE_POST";
export const FETCH_POSTS = "FETCH_POSTS";
export const DELETE_POST = "DELETE_POST";

const initialState = {
  posts: [],
};

// const postSlice = createSlice({
//   name: "post",
//   initialState,
//   reducers: {
//     getPosts: (state, action) => {
//       return {
//         ...state,
//         posts: action.payload,
//       };
//     },
//     createNewPost: (state, action) => {
//       return {
//         ...state,
//         posts: [action.payload, ...state.posts],
//       };
//     },
//   },
// });
// export const { getPosts, createNewPost } = postSlice.actions;
// export default postSlice.reducer;

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: payload,
      };

    default:
      return state;
  }
};
