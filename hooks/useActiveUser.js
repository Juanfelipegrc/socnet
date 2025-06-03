import { useDispatch, useSelector } from "react-redux"
import { cleanActiveUser, setActiveUser } from "../store/slices/activeUserSlice";
import { usePathname, useRouter } from "expo-router";




export const useActiveUser = () => {

    const activeUserState = useSelector(state => state.activeUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();


    const onSetActiveUser = (id) => {


        dispatch(setActiveUser(id));


        router.push(`/user-profile/${id}`);
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