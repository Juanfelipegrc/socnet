import { createSlice } from '@reduxjs/toolkit';


export const pathHistorySlice = createSlice({
    name: 'pathHistorySlice',
    initialState: {
        pathHistory: [],
    },
    reducers: {
        
       setPathHistory: (state, {payload}) => {
        state.pathHistory = payload
       }

    }
});


export const { setPathHistory } = pathHistorySlice.actions;