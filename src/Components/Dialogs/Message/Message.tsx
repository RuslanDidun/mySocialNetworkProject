import React from 'react';
import d from './../Dialogs.module.css';

type MessagesType = {
    message: string
}

const Message = (props: MessagesType) => {
    return <div className={d.dialog}>{props.message}</div>

}

export default Message;