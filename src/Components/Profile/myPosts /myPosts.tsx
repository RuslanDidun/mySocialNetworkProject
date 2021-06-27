import React, {ChangeEvent} from 'react';
import p from './myPosts.module.css';
import Posts from "./post/Posts";
import {PostType} from "../../../Redux/profile-reducer";

type MyPostsType = {
    posts: Array<PostType>
    addPost: () => void
    updateNewPostText: (newText: string) => void
    newPostText: string
}

const MyPosts = (props: MyPostsType) => {

    const postsElements = props.posts.map(p => <Posts message={p.message}
                                                      likesCount={p.likesCount}/>);    /*Мапим массив данных (p = posts)*/

    let onAddPost = () => {
        props.addPost();
    }

    let changePost = (e : ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget?.value;
        if (text)
        props.updateNewPostText(text);
    }

    return (
        <div className={p.postsBlock}>
            <div>
                <h4>My Posts</h4>
                <div>
                    <div>
                        <textarea onChange={changePost}
                                  value={props.newPostText}/>

                    </div>
                    <button onClick={onAddPost}>Add post
                    </button>
                </div>
                <div className={p.posts}>
                    {postsElements} {/*Вызываем новый массив после .мар*/}
                </div>
            </div>
        </div>
    )
}
export default MyPosts;

