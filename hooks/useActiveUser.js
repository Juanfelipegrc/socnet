import { useDispatch, useSelector } from "react-redux"
import {setActiveUser} from '../store/slices/userActiveSlice'


export const useActiveUser = () => {
    const userActiveState = useSelector(state => state.userActive);
    const dispatch = useDispatch();


    const onSetActiveUser = (user) => {
        console.log(user)
        dispatch(setActiveUser(user));
    };


    return {
        ...userActiveState,
        userActiveState,
        onSetActiveUser,
    }
}