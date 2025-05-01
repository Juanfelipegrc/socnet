import { createSlice } from '@reduxjs/toolkit';


export const activePostSlice = createSlice({
    name: 'activePostSlice',
    initialState: {
        author: {
            _id: '',
            username: '',
            image: '',
        },
        _id: '',
        _creationTime: '',
        userId: '',
        imageUrl: '',
        storageId: '',
        caption: '',
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false,
        lastPath: '',
        actualUserPicture: '',
    },
    reducers: {
        
        setActivePost: (state, {payload}) => {
           state.author = payload.author;
           state._id = payload._id;
           state._creationTime = payload._creationTime;
           state.userId = payload.author;
           state.imageUrl = payload.imageUrl;
           state.storageId = payload.storageId;
           state.caption = payload.caption;
           state.likes = payload.likes;
           state.comments = payload.comments;
           state.isLiked = payload.isLiked;
           state.isBookmarked = payload.isBookmarked;
           state.lastPath = payload.lastPath;
           state.actualUserPicture = payload.actualUserPicture;
        },


    }
});


export const { setActivePost } = activePostSlice.actions;