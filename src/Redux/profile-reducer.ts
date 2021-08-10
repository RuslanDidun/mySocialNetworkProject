import {PhotosType, PostType, ProfileType} from "../types/types"
import {stopSubmit, FormAction} from "redux-form"
import {profileAPI} from "../api/profileAPI";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {ResultCodeEnum} from "../api/api";

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are you doing?', likesCount: 98},
        {id: 2, message: 'Wow! Nice social network!', likesCount: 55},  /*выносим posts в компоненту App -> Profile -> myPosts7*/
        {id: 3, message: 'How is your snowboard?', likesCount: 15},
    ] as Array<PostType>,
    newPostText: 'Ruslan-Kaban',
    profile: null as ProfileType | null,
    status: ''
}
export type InitialStateType = typeof initialState


const profileReducer = (state: InitialStateType, action:ActionsType) => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let stateCopy = {...state}
            let addPost = {
                id: state.posts[state.posts.length - 1].id + 1,
                message: state.newPostText,
                likesCount: 0
            }
            stateCopy = {
                ...state,
                posts: [...state.posts, addPost],   // копируем посты + пушим новый
                newPostText: ""                     // затираем ввод ввод после пуша
            }
            return stateCopy
        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText}
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {...state, posts: {...state.posts}}
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state

    }
}

//Action Creators
export const actions = {
     addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText}as const),
     removePost: (id: number) => ({type: 'SN/PROFILE/DELETE_POST', id}as const),
     updateNewPostText: (newText: string) => ({
        type: 'UPDATE-NEW-POST-TEXT',
        newText
    }as const),
     setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile}as const),
     setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status}as const),
     savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS',
        photos
    }as const)
}

//thunk creators
export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
   const data = await profileAPI.getProfile(userId)
            dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number):ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)
            dispatch(actions.setStatus(data))
        }
export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === ResultCodeEnum.Success0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
    }
}
export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Success0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType):ThunkType => async(dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodeEnum.Success0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>