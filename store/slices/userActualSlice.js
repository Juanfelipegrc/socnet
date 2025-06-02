import { createSlice } from '@reduxjs/toolkit';


export const userActualSlice = createSlice({
    name: 'userActualSlice',
    initialState: {
        username: '',
        fullname: '',
        image: '',
        bio: '',
        email: '',
        followers: 0,
        following: 0,
        posts: 0,
        clerkId: '',
        _id: '',
    },
    reducers: {
        
        setActualUser: (state, {payload}) => {
           state.username = payload.username;
           state.fullname = payload.fullname;
           state.image = payload.image;
           state.bio = payload.bio;
           state.email = payload.email;
           state.followers = payload.followers;
           state.following = payload.following;
           state.posts = payload.posts;
           state.clerkId = payload.clerkId;
           state._id = payload._id;
        }
    }
});


export const { setActualUser } = userActualSlice.actions;