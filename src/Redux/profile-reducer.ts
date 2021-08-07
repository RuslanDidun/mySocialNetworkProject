import {profileAPI, usersAPI} from "../api/api"
import {PhotosType, PostType, ProfileType} from "../types/types"
import {stopSubmit} from "redux-form"


export type ProfilePageType = {
    posts: PostsType
    newPostText: string
}
export type PostsType = Array<PostType>


type AllActionType = AddPostActionType
    | RemovePostActionType
    | UpdateNewPostTextActionType
    | SetUserProfileType
    | SetStatusType
    | SavePhotoSuccessActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are you doing?', likesCount: 98},
        {id: 2, message: 'Wow! Nice social network!', likesCount: 55},  /*выносим posts в компоненту App -> Profile -> myPosts7*/
        {id: 3, message: 'How is your snowboard?', likesCount: 15},
    ],
    newPostText: 'Ruslan-Kaban',
    profile: null as ProfileType | null,
    status: ''
}
export type InitialStateType = typeof initialState


const profileReducer = (state: InitialStateType, action: AllActionType) => {
    switch (action.type) {
        case 'ADD-POST':
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
        case 'REMOVE-POST': {
            return {...state, posts: {...state.posts}}
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case "SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state

    }
}

//Action Creators with types
type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({type: 'ADD-POST', newPostText})

type RemovePostActionType = {
    type: 'REMOVE-POST',
    id: number
}
export const removePost = (id: number): RemovePostActionType => ({type: 'REMOVE-POST', id})

type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export const updateNewPostText = (newText: string): UpdateNewPostTextActionType => ({
    type: 'UPDATE-NEW-POST-TEXT',
    newText
})

type SetUserProfileType = {
    type: 'SET_USER_PROFILE',
    profile: null
}
export const setUserProfile = (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile})

type SetStatusType = {
    type: 'SET_STATUS',
    status: string
}
export const setStatus = (status: string) => ({type: 'SET_STATUS', status})

type SavePhotoSuccessActionType = {
    type: 'SAVE_PHOTO_SUCCESS'
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: 'SAVE_PHOTO_SUCCESS',
    photos
})

//thunk creators
export const getUserProfile = (userId: number) => (dispatch: any) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        });
};
export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async(dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer