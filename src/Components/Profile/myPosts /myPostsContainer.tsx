import React from 'react'
import MyPosts, {DispatchPropsType, MapPropsType} from "./myPosts"
import {connect} from "react-redux"
import {AppStateType} from "../../../Redux/redux-store";
import { actions } from '../../../Redux/profile-reducer';



let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPost
})(MyPosts);

export default MyPostsContainer;
