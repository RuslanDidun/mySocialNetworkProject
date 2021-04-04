import React from 'react';
import f from "./myFriends.module.css";
import Posts from "../../Profile/myPosts /post/Posts";

type PropsType ={
    name: string
}

const FriendsList = (props:PropsType) => {


    return (
        <div className={f.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhupo3tlo5pc6JK_rxRFYKjjVQ3_aF3kESQ&usqp=CAU"
                alt=""/>
            <div>
                <span>name</span> {props.name}
            </div>
        </div>

    )
}

export default FriendsList;