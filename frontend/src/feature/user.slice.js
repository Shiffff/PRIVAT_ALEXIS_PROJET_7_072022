import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    setUpdateBio: (state, { payload }) => {
      state.user.bio = payload;
    },
    setFollowUser: (state, { payload }) => {
      state.user.following.push(payload);
    },
    setUnFollowUser: (state, { payload }) => {
      state.user.following = state.user.following.filter((id) => id !== payload)
    },
  },
});



export const { setUserData, setUpdateBio, setFollowUser, setUnFollowUser } = userSlice.actions;
export default userSlice.reducer;
