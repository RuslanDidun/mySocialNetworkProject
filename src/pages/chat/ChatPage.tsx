import React, {useEffect, useRef, useState} from "react"
import {Button} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import {ChatMessageAPIType} from "../../api/chat-api";


const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return <div>
        {status === 'error' && <div>Error</div>}
        <>
            <Messages/>
            <MessageForm/>
        </>
    </div>
}


const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    //auto scroll
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div style={{height: 400, overflow: "auto"}} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m}/>)}

        <div ref={messagesAnchorRef}> </div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return <div>
        <img src={message.photo} style={{width: '40px'}} alt={'avatar'}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})


const MessageForm: React.FC<{}> = () => {
    //дисэйблим кнопку до подключения вебсокета
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                  value={message}> </textarea>
        <div>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>
                send
            </Button>
        </div>
    </div>
}

export default ChatPage