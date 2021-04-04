import React from 'react';
import p from './myPosts.module.css';
import Posts from "./post/Posts";
import {PostType} from "../../../Redux/state";

type MyPostsType = {
    addPost: (newText: string) => void
    posts: Array<PostType>
}

const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.posts.map(p => <Posts message={p.message}
                                    likesCount={p.likesCount}/>);    /*Мапим массив данных (p = posts)*/

    let newPostElement = React.createRef<HTMLTextAreaElement>();   /* создаем ссылку на элемент*/

    let addPost = () => {
        let newText = newPostElement.current?.value;
        if (newText) {props.addPost(newText);}
    }

    return (
        <div className={p.postsBlock}>
            <div>
                <h4>My Posts</h4>
                <div>
                    <div>
                        <textarea ref={newPostElement}></textarea>
                    </div>
                    <button onClick={addPost}>Add post
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

