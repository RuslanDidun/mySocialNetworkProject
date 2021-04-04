import React from 'react';
import p from './Post.module.css';

export type PostsType = {
    message: string
    likesCount: number
}

const Posts = (props:PostsType) => {
    return <div className={p.item}>
        <div>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhupo3tlo5pc6JK_rxRFYKjjVQ3_aF3kESQ&usqp=CAU"
                alt=""/>
            {props.message}
            <div className={p.like}>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    </div>
}
export default Posts;

