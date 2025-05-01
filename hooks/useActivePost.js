import { useDispatch, useSelector } from "react-redux"
import {setActivePost} from '../store/slices/activePostSlice'
import { useRouter } from "expo-router";


export const useActivePost = () => {

    const dispatch = useDispatch();
    const activePostState = useSelector(state => state.activePost);
    const router = useRouter();

    const onSetActivePost = async(post, fromWhere) => {
        dispatch(setActivePost({...post, lastPath: fromWhere}));
        router.replace(`/post/${post._id}`);
    };

    console.log({ACTIVEPOST:activePostState})



    return {
        ...activePostState,
        post: activePostState,
        onSetActivePost,
    }

}