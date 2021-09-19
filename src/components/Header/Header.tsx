import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {selectCurrentLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from '../../redux/auth-reducer';

export type MapPropsType = {}
export type DispatchPropsType = {}

export const AppHeader: React.FC<MapPropsType & DispatchPropsType> = (props) => {


    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentLogin)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }

    return <div>
        {isAuth
            ? <div>
                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                {login}<Button onClick={logoutCallback}>Log out</Button>
            </div>
            :
            <Button>
                <Link to={'/login'}>Login</Link>
            </Button>
        }
    </div>
}

