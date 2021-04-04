import {rerenderEntireTree} from "../render"

export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}
export type ProfilePageType = {
    posts: Array<PostType>
}
export type FriendsListType = {
    id: number
    name: string
}
export type SideBarType = {
    friendsList: Array<FriendsListType>
}
export type RootStateType = {
    dialogPage: DialogPageType
    profilePage: ProfilePageType
    sideBar: SideBarType
}

export const state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi! How are you doing?', likesCount: 3},
            {id: 2, message: 'Wow! Nice social network!', likesCount: 25},  /*выносим posts в компоненту App -> Profile -> myPosts7*/
            {id: 3, message: 'How is your snowboard?', likesCount: 7},
        ],
    },
    dialogPage: {
        dialogs: [
            {id: 1, name: 'Anna'},                  /*Обьекты с данными*/
            {id: 2, name: 'Marry'},               /*   выносим с  Dialogs.tsx*/
            {id: 3, name: 'Lorraine'},
            {id: 4, name: 'Rachel'},
            {id: 5, name: 'Alina'}
        ],
        messages: [
            {id: 1, message: 'Hi! How are you doing?'},
            {id: 2, message: 'Whats up!'},
            {id: 3, message: 'Lets go for coffee!'},             /*Обьекты с данными*/
            {id: 4, message: 'I miss you..!'},                  /*выносим с  Dialogs.tsx*/
            {id: 5, message: 'How are you?'},
        ]
    },
    sideBar: {
        friendsList: [
            {id: 1, name: 'Olga'},
            {id: 2, name: 'Anna'},
            {id: 3, name: 'Amanda'}
        ]
    }
}

export let addPost = (helloWorld: string) => {
    let newPost = {
        id: 5,
        message: helloWorld,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state;