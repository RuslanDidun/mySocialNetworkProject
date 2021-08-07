import {authAPI, ResultCodeEnum, ResultCodeForCaptcha, securityApi} from "../api/api"
import { stopSubmit } from "redux-form";


const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'

export let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

type AuthUserActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type AuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: AuthUserActionPayloadType
}

export const setAuthUserData = (userId: number | null,
                                email: string | null,
                                login: string | null,
                                isAuth: boolean): AuthUserDataActionType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaSuccess(captchaUrl))
}

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success0) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email: string,
                      password: string,
                      rememberMe: boolean,
                      captcha: string) => async (dispatch: any) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then((response) => {
            if (response.data.resultCode === ResultCodeEnum.Success0) {
                dispatch(getAuthUserData())
            } else {
                if (response.data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}

export const logout = () => async (dispatch: any) => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === ResultCodeEnum.Success0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
};


/*
type ActionsType =
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof toggleIsFetching>*/


export default authReducer