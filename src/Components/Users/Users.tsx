import React from 'react';
import axios from "axios";
import {UsersType} from "../../Redux/users-reduser";
import userPhoto from "../../assets/avatar.jpg"
import styles from './users/.module.css'


type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
}

class UsersAPIComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${this.props.currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                }
            )
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.setUsers(response.data.items)
                })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return <Users/> <div>
            <div>
                {pages.map(p => {
                    return
                    <span className={this.props.currentPage === p && styles.selectedPage}
                    onClick={() => {this.onPageChanged(p) }}>{p}</span>
                })}

            </div>
            {
                this.props.users.map((u) => <div key={u.id}>
               <span>
                   <div>
                       <img src={u.photos.small != null ? u.photos.small : userPhoto}/>
                   </div>
                   <div>
                       {u.followed
                           ? <button onClick={() => {
                               this.props.unfollow(u.id)
                           }}>Unfollow</button>
                           : <button onClick={() => {
                               this.props.follow(u.id)
                           }}>Follow</button>}
                   </div>
               </span>
                    <span>
                   <span>
                       <div>{u.name}</div>
                       <div>{u.status}</div>
                   </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
               </span>
                </div>)
            }
        </div>
    }
}

export default UsersAPIComponent;