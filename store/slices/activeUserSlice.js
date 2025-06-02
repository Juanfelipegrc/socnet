import { createSlice } from '@reduxjs/toolkit';


export const activeUserSlice = createSlice({
    name: 'activeUserSlice',
    initialState: {
        username: '',
        fullname: '',
        _id: '',
        image: '',
        bio: '',
        email: '',
        followers: 0,
        following: 0,
        posts: 0,
        clerkId: '',
        postsList: [],
        isFollowing: false,
        lastPathHistory: [],
    },
    reducers: {
        
        setActiveUser: (state, {payload}) => {
           state.username = payload.username;
           state.fullname = payload.fullname;
           state._id = payload._id;
           state.image = payload.image;
           state.bio = payload.bio;
           state.email = payload.email;
           state.followers = payload.followers;
           state.following = payload.following;
           state.posts = payload.posts;
           state.clerkId = payload.clerkId;
           state.postsList = payload.postsList;
           state.lastPathHistory = payload.lastPathHistory;
        },
        cleanActiveUser: (state) => {
            state.username = ''
            state.fullname = ''
            state._id = ''
            state.image = ''
            state.bio = ''
            state.email = ''
            state.followers = 0
            state.following = 0
            state.posts = 0
            state.clerkId = ''
            state.postsList = []
            state.lastPathHistory = []
        }
    }
});


export const { setActiveUser, cleanActiveUser} = activeUserSlice.actions;