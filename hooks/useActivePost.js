import { useDispatch, useSelector } from "react-redux"
import {cleanActivePost, setActivePost} from '../store/slices/activePostSlice'
import { usePathname, useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";


export const useActivePost = () => {

    const dispatch = useDispatch();
    const activePostState = useSelector(state => state.activePost);
    const router = useRouter();
    const pathname = usePathname();
    const getPostById = useQuery(api.posts.getIndividualPost, pathname.split('/')[1] === 'post'? {postId: pathname.split('/')[2]}  : 'skip');


    

    
        

    const onSetActivePost = async(post ) => {
        dispatch(setActivePost({...post}));
        router.push(`/post/${post._id}`);
    };

    const onCleanActivePost = () => {
        dispatch(cleanActivePost());
    };

    useEffect(() => {
        const pathIsPost = pathname.split('/')[1] === 'post';
        const postId = pathname.split('/')[2];

        if (pathIsPost && getPostById && postId) {
            dispatch(setActivePost({ ...getPostById }));
        }
    }, [pathname, getPostById, dispatch]);

    useEffect(() => {
      if(pathname.split('/')[1] !== 'post'){
        setTimeout(() => {
            onCleanActivePost();
        }, 500);
      }
    }, [pathname])
    

    return {
        ...activePostState,
        post: activePostState,
        onSetActivePost,
        onCleanActivePost,
    }

}