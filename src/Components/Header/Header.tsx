import React from 'react';
import {NavLink} from 'react-router-dom';
import h from './Header.module.css';

const Header = (props) => {
    return <header className={h.header}>
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxqiAsswkqx6TgkpvbSZLU-nvanWdwaw_IA&usqp=CAU"
            alt=""/>

        <div className={h.loginBlock}>
            {props.isAuth ? props.login
               : <NavLink to ={'/login'}>login</NavLink>}
        </div>
    </header>
}

export default Header;