import React, {useEffect, useState} from "react"
import {Button} from "antd"

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    return <div>
        <Messages/>
        <MessageForm/>
    </div>
}


const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return <div style={{height: 400, overflow: "auto"}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: '40px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}


const MessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }

    return <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                  value={message}>
        </textarea>
        <div>
            <Button onClick={sendMessage}>
                send
            </Button>
        </div>
    </div>
}

export default ChatPage