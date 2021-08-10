import {ApiResponseType, instance, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string,
          password: string,
          rememberMe = false,
          captcha: null | string = null) {
        return instance.post<ApiResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>
        (`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`,)
    }
}