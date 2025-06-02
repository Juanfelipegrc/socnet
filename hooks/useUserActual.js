import { useDispatch, useSelector } from "react-redux"
import {setActualUser} from '../store/slices/userActualSlice'


export const useUserActual = () => {
    const userActualState = useSelector(state => state.userActual);
    const dispatch = useDispatch();


    const onSetActualUser = (user) => {
        dispatch(setActualUser(user));
    };
    



    return {
        ...userActualState,
        userActualState,
        onSetActualUser,
    }
}