import React from 'react';
import p from './Profile.module.css';
import MyPosts from "./myPosts /myPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostType, ProfilePageType, RootStateType} from "../../Redux/state";

type ProfileType = {
    addPost: (newText: string) => void
    posts: Array<PostType>
}

const Profile = (props: ProfileType) => {

    return (
        <div className={p.content}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}  //
                     addPost={props.addPost}
            />

        </div>
    )
}


export default Profile;