import { configureStore } from "@reduxjs/toolkit";
import { activePostSlice } from "./slices/activePostSlice";
import {userActualSlice} from './slices/userActualSlice';
import {activeUserSlice} from './slices/activeUserSlice';


export const store = configureStore({
    reducer: {
        activePost: activePostSlice.reducer,
        userActual: userActualSlice.reducer,
        activeUser: activeUserSlice.reducer,
    }
})