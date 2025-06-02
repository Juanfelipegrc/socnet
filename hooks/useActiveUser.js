import { useDispatch, useSelector } from "react-redux"
import { cleanActiveUser, setActiveUser } from "../store/slices/activeUserSlice";
import { useRouter } from "expo-router";




export const useActiveUser = () => {

    const activeUserState = useSelector(state => state.activeUser);
    const dispatch = useDispatch();
    const router = useRouter();


    const onSetActiveUser = (user, shouldNavigate = true) => {

        dispatch(setActiveUser({...user}));

        if(!shouldNavigate) return;
        router.push(`/user-profile/${user?._id}`);
    };

    const onCleanActiveUser = () => {
        dispatch(cleanActiveUser());
    }


    return {
        ...activeUserState,
        activeUserState,
        onSetActiveUser,
        onCleanActiveUser,
    }


}