import { useDispatch, useSelector } from "react-redux"
import {setPosts, setBookmarks, setStories, setNotifications} from '../store/slices/postsSlice'


export const usePosts = () => {
    
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();



    const onSetPosts = (posts) => {
        dispatch(setPosts(posts));
    };
    const onSetBookmarks = (bookmarks) => {
        dispatch(setBookmarks(bookmarks));
    };
    const onSetStories = (stories) => {
        dispatch(setStories(stories));
    };
    const onSetNotifications = (notifications) => {
        dispatch(setNotifications(notifications));
    };


    const onCleanAllUserInfo = () => {
        dispatch(setPosts([]));
        dispatch(setBookmarks([]));
        dispatch(setStories([]));
        dispatch(setNotifications([]));
    }

    return {
        ...posts,
        posts,
        onSetPosts,
        onSetBookmarks,
        onSetStories,
        onSetNotifications,
        onCleanAllUserInfo,
    }
}