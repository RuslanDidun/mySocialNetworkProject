import React, {ChangeEvent} from 'react'
import d from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {DialogType, MessageType} from '../../Redux/dialogs-reducer'

type DialogsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessageAC: () => void
    newMessageBody: string
    updateMessageAC: (body: string) => void
}

const Dialogs: React.FC<DialogsType> = (props) => {

    let dialogsElements = props.dialogs.map((d: any) => <DialogItem name={d.name}
                                                                    key={d.id}
                                                                    id={d.id}/>)  /*метод .мар что бы не дублировать код*/

    let messagesElements = props.messages.map((m: any) => <Message message={m.message}
                                                                   key={m.id}/>)

    let newMessageBody = props.newMessageBody
    let newDialogElement = React.createRef<HTMLTextAreaElement>()

    let sendMessage = () => {
        props.addMessageAC()
    }

    let newMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = newDialogElement.current?.value
        if (body) {
            props.updateMessageAC(body)
        }
    }

    return (
        <div className={d.dialogs}>
            <div className={d.dialogsItems}>
                {dialogsElements} {/*Вызываем новый массив после .мар*/}
            </div>
            <div className={d.messages}>
                <div>{messagesElements}</div>

                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={newMessageChange}
                                   placeholder='enter your message'> </textarea></div>
                    <div>
                        <button onClick={sendMessage}>Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs