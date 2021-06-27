import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts /post/myPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile ={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}


export default Profile;