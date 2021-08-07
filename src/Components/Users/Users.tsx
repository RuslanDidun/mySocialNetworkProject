import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from "./User"
import { UsersType } from '../../Redux/users-reduser'

type PropsUsersType = {
    currentPage: number
    totalUserCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsUsersType> = ({currentPage, totalUserCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUserCount}
                   pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}

export default Users
