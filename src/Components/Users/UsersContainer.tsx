import React from 'react'
import {connect} from "react-redux"
import {
    follow, requestUsers,
    unfollow, UsersType
} from "../../Redux/users-reduser"
import Users from "./Users"
import {compose} from 'redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../Redux/users-selectors"
import Preloader from "../common/Preloader/Preloader"
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type OwnContainerPropsType = {
    pageTitle: string
}
type ContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnContainerPropsType

class UsersContainer extends React.Component<ContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)

    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {/*isFetching - загрузочный спиннер */}
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUserCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users} //refactor after
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType,AppStateType, OwnContainerPropsType>(
        mapStateToProps,
        {follow, unfollow, getUsers: requestUsers})
)(UsersContainer)


