import React from 'react'
import s from './myPosts.module.css'
import Posts from "./post/Posts"
import {PostType} from "../../../types/types"
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}


const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    const postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Posts key={p.id}
                                message={p.message}
                                likesCount={p.likesCount}/>)   /*Мапим массив данных (p = posts)*/

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;

