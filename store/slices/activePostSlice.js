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
           state.lastPathHistory = payload.lastPathHistory;
           state.actualUserPicture = payload.actualUserPicture;
        },

        cleanActivePost: (state) => {
            state.author = {
                _id: '',
                username: '',
                image: '',
            };
            state._id = '';
            state._creationTime = '';
            state.userId = '';
            state.imageUrl = '';
            state.storageId = '';
            state.caption = '';
            state.likes = 0;;
            state.comments = 0;;
            state.isLiked = false;;
            state.isBookmarked = false;
            state.lastPathHistory = [];
            state.actualUserPicture = '';
        }


    }
});


export const { setActivePost, cleanActivePost } = activePostSlice.actions;