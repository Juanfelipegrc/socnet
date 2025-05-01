import { createSlice } from '@reduxjs/toolkit';


export const userActiveSlice = createSlice({
    name: 'userActiveSlice',
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
    },
    reducers: {
        
        setActiveUser: (state, {payload}) => {
           state.username = payload.username;
           state.fullname = payload.fullname;
           state.image = payload.image;
           state.bio = payload.bio;
           state.email = payload.email;
           state.followers = payload.followers;
           state.following = payload.following;
           state.posts = payload.posts;
           state.clerkId = payload.clerkId;
        }
    }
});


export const { setActiveUser } = userActiveSlice.actions;