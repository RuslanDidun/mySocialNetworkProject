import {ResultCodeEnum, ResultCodeForCaptcha} from "../api/api"
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authAPI";
import {securityApi} from "../api/securityApi";
import {BaseThunkType, InferActionsType} from "./redux-store";

export let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions> //выводим тип из экшн типа
type ThunkType = BaseThunkType<ActionsType| ReturnType<typeof stopSubmit>>

//reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

// actions creator wrapped in object
export const actions = {
    setAuthUserData: (userId: number | null,
                      email: string | null,
                      login: string | null,
                      isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const),
}

//thunks
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodeEnum.Success0) {
        let {id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCodeEnum.Success0) {
                dispatch(getAuthUserData())
            } else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 ?data.messages[0] : 'Some Error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        }
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaSuccess(captchaUrl))
}
export const logout = ():ThunkType => async (dispatch) => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === ResultCodeEnum.Success0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
        })
}

export default authReducer

