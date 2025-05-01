import { createSlice } from '@reduxjs/toolkit';


export const postsSlice = createSlice({
    name: 'postsSlice',
    initialState: {
        posts: [],
        bookmarks: [],
        stories: [],
    },
    reducers: {
        
        setPosts: (state, {payload}) => {
           state.posts = payload
        },
        setBookmarks: (state, {payload}) => {
            state.bookmarks = payload
         },
        setStories: (state, {payload}) => {
            state.stories = payload
        },

    }
});


export const { setPosts, setBookmarks, setStories } = postsSlice.actions;