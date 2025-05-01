import { configureStore } from "@reduxjs/toolkit";
import { activePostSlice } from "./slices/activePostSlice";
import { userActiveSlice } from "./slices/userActiveSlice";
import { postsSlice } from "./slices/postsSlice";


export const store = configureStore({
    reducer: {
        activePost: activePostSlice.reducer,
        posts: postsSlice.reducer,
        userActive: userActiveSlice.reducer,
    }
})