import React from 'react'
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {InitialStateType} from '../../Redux/dialogs-reducer'
import AddMessageForm from "./AddMessageForm/AddMessageForm";


type DialogsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<DialogsType> = (props) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name}
                                                             key={d.id}
                                                             id={d.id}/>)  /*метод .мар что бы не дублировать код*/
    let messagesElements = state.messages.map(m => <Message message={m.message}
                                                            key={m.id}/>)

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }


    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {dialogsElements} {/*Вызываем новый массив после .мар*/}
            </div>
            <div className={d.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}

export default Dialogs