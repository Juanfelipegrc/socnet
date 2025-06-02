import { configureStore } from "@reduxjs/toolkit";
import { activePostSlice } from "./slices/activePostSlice";
import { postsSlice } from "./slices/postsSlice";
import {userActualSlice} from './slices/userActualSlice';
import {activeUserSlice} from './slices/activeUserSlice';
import {pathHistorySlice} from './slices/pathHistorySlice';


export const store = configureStore({
    reducer: {
        activePost: activePostSlice.reducer,
        posts: postsSlice.reducer,
        userActual: userActualSlice.reducer,
        activeUser: activeUserSlice.reducer,
        pathHistory: pathHistorySlice.reducer,
    }
})