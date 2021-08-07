import React from 'react'
import {NavLink} from 'react-router-dom'
import d from './../Dialogs.module.css'

type DialogsType = {
    name: string
    id: number
}

const DialogItem = (props: DialogsType) => {
    let path = "/dialogs/" + props.id
    return <div className={d.dialog}>
        <NavLink to={path}>{props.name}</NavLink> {/*Делаем ссылками имена диалогов*/}
    </div>
}


export default DialogItem;