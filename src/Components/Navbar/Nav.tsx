import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Nav.module.css'
import FriendsList from "./myFriends/myFriends"

const Nav = (props) => {
    return <nav className={s.nav}>
        <div className=''>
            <div className={s.item}>
                <NavLink to="/Profile" activeStyle={{color: 'gold'}}>myProfile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Dialogs" activeStyle={{color: 'gold'}}>myMessages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Music" activeStyle={{color: 'gold'}}>myMusic</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/News" activeStyle={{color: 'gold'}}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Settings" activeStyle={{color: 'gold'}}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Friends" activeStyle={{color: 'gold'}}>Friends</NavLink>
            </div>
            <FriendsList name={props.name}/>
            <FriendsList name={props.name}/>
            <FriendsList name={props.name}/>



        </div>

    </nav>
}

export default Nav