import { createSlice } from '@reduxjs/toolkit';


export const activeUserSlice = createSlice({
    name: 'activeUserSlice',
    initialState: {
        _id: '',
    },
    reducers: {
        
        setActiveUser: (state, {payload}) => {
           state._id = payload;
           
        },
        cleanActiveUser: (state) => {
            state._id = ''
        }
    }
});


export const { setActiveUser, cleanActiveUser} = activeUserSlice.actions;