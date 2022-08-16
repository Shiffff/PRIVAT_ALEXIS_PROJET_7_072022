import { createSlice } from "@reduxjs/toolkit";



export const postSlice = createSlice({
  
    name: "post",
    initialState: {
      post: {},
    },
    reducers: {
      setPostData: (state, { payload }) => {
        state.post = payload;
      },
      setLikePost: (state, { payload }) => {
        state.post = state.post.map((postOne) => {
          if (postOne._id === payload[1]) {
            return {
              ...postOne,
              likers: postOne.likers.concat(payload[0]),
            }
            }else {
              return postOne;
            }
          });
        },
      
      setUnLikePost: (state, { payload }) => {
        state.post = state.post.map((postOne) => {
          if (postOne._id === payload[1]) {
            return {
              ...postOne,
              likers: postOne.likers.filter((id) => id !== payload[0]),
            }
            }else {
              return postOne;
            }
          });
        },
    },
  });



export const { setPostData,  setLikePost, setUnLikePost } = postSlice.actions;
export default postSlice.reducer;
