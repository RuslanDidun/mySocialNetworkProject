import React, {useEffect, useState} from "react"
import {Button} from "antd"

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {

        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

                ws?.removeEventListener('close', closeHandler)
                ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws?.addEventListener('close', () => {
                setTimeout(createChannel, 3000)
            })
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }

    }, [])


    return <div>
        <Messages wsChannel={wsChannel}/>
        <MessageForm wsChannel={wsChannel}/>
    </div>
}


const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return() => {
            wsChannel?.removeEventListener('message',messageHandler)
        }

    }, [wsChannel])

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


const MessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    //дисэйблим кнопку до подключения вебсокета
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {

        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                  value={message}>
        </textarea>
        <div>
            <Button disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>
                send
            </Button>
        </div>
    </div>
}

export default ChatPage