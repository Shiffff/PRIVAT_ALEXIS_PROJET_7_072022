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
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: {},
  },
  reducers: {
    setUsersData: (state, { payload }) => {
      state.users = payload;
    },
  },
});




export const { setUserData, setUpdateBio } = userSlice.actions;
export default userSlice.reducer;
