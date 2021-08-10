import axios from "axios"
import {UsersType} from "../Redux/users-reduser";
//DAL COMPONENT


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cb23f35d-ab67-4a69-88b7-8930661a2897'
    }
});

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}
export enum ResultCodeEnum {
    Success0 = 0,
    Error1,
}


export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

//Generic type API response //
export type ApiResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}