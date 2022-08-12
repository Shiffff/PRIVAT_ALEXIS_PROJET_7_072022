import { createSlice } from "@reduxjs/toolkit";


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



export const { setUsersData } = usersSlice.actions;
export default usersSlice.reducer;
