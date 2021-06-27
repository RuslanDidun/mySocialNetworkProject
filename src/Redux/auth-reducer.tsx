import {authAPI, usersAPI} from "../api/api";
import {setUserProfile} from "./profile-reducer";

const SET_USER_DATA = 'SET_USER_DATA'


export let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

type InitialStateType = typeof initialState

const authReducer = (initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const authUserTC = (userId,email,login) =>(dispatch) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                let {id,email,login} = response.data.data;
                dispatch(setAuthUserData(id,email,login));
            }
        })
};

export const setAuthUserData = (userId, email, login) => ({type:SET_USER_DATA , data:{userId, email, login}} as const)

/*
type ActionsType =
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>*/



export default authReducer;