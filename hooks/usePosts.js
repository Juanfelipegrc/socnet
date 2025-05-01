import { useDispatch, useSelector } from "react-redux"
import {setPosts, setBookmarks, setStories} from '../store/slices/postsSlice'


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


    return {
        ...posts,
        posts,
        onSetPosts,
        onSetBookmarks,
        onSetStories,
    }
}