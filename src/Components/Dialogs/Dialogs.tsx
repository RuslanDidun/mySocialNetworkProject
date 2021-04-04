import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import d from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType, RootStateType} from "../../Redux/state";

type DialogType = {
    dialogs:Array<DialogsType>
    messages: Array<MessagesType>
}

const Dialogs = (props: DialogType) => {
    let dialogsElements = props.dialogs.map
    (d  => <DialogItem name={d.name} id={d.id}/>);   /*метод .мар что бы не дублировать код*/
    let messagesElements = props.messages.map
    (m => <Message message={m.message}/>);

    return (
        <BrowserRouter>
            <div className={d.dialogs}>
                <div className={d.dialogsItems}>
                    {dialogsElements} {/*Вызываем новый массив после .мар*/}
                </div>
                <div className={d.messages}>
                    {messagesElements} {/*Вызываем новый массив после .мар*/}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Dialogs;