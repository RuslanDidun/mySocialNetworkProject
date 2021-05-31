export type ProfilePageType = {
    posts: PostsType
    newPostText: string
}
export type PostsType = Array<PostType>
export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

type AddPostActionType = { type: 'ADD-POST' }
type RemovePostActionType = { type: 'REMOVE-POST' }
type UpdateNewPostTextActionType = { type: 'UPDATE-NEW-POST-TEXT', newText: string }
type AllActionType = AddPostActionType | RemovePostActionType | UpdateNewPostTextActionType

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are you doing?', likesCount: 98},
        {id: 2, message: 'Wow! Nice social network!', likesCount: 55},  /*выносим posts в компоненту App -> Profile -> myPosts7*/
        {id: 3, message: 'How is your snowboard?', likesCount: 15},
    ],
    newPostText: 'Ruslan-Kaban'
}

const profileReducer = (state: ProfilePageType = initialState, action: AllActionType): ProfilePageType => {
    switch (action.type) {

        case 'ADD-POST':
            let stateCopy = {...state};
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
            return stateCopy;

        case 'UPDATE-NEW-POST-TEXT': {
            return {...state, newPostText: action.newText}
        }

        case 'REMOVE-POST': {
            return {...state, posts: {...state.posts}}
        }

        default:
            return state
    }
}

export const addPostAC = () => ({type: 'ADD-POST'})
export const removePostAC = () => ({type: 'REMOVE-POST'})
export const updateNewPostTextAC = (text) => ({type: 'UPDATE-NEW-POST-TEXT', newText: text})

export default profileReducer;