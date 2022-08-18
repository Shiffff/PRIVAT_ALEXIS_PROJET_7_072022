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

        putPostData: (state, { payload }) => {
          state.post = state.post.map((postOne) => {
            if (postOne._id === payload[1]) {
              return {
                ...postOne,
                message: payload[0],
              }
              }else{
              return postOne;
            }
        });
    },

    deletePost: (state, { payload }) => {
      state.post = state.post.filter((postOne) => postOne._id !== payload);
    },

    editComment: (state, { payload }) => {
      state.post = state.post.map((postOne) => {
        if (postOne._id === payload[1]) {
          return {
            ...postOne,
            comments: postOne.comments.map((comment) => {
              if (comment._id === payload[0]){
                return {
                  ...comment, 
                  text: payload[2]
                }
              } else {
                return comment
              }
            })
          }
          }else{
          return postOne;
        }
    });
    },


    deleteComment: (state, { payload }) => {
      state.post = state.post.map((postOne) => {
        if (postOne._id === payload[1]) {
          return {
            ...postOne,
            comments: postOne.comments.filter((comment) => comment._id !== payload[0])
          }
          }else{
          return postOne;
        }
    });
    },









    },
  });



export const { setPostData,  setLikePost, setUnLikePost, putPostData, deletePost, editComment, deleteComment } = postSlice.actions;
export default postSlice.reducer;
