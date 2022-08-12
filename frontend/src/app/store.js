import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice"
import usersReducer from "../feature/users.slice"


export default configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
    },
})