const SEND_MESSAGE = 'SEND_MESSAGE'

export type DialogsPageType = {
    dialogs: DialogsType
    messages: MessagesType
    newMessageBody: string;
}
export type DialogsType = Array<DialogType>
export type MessagesType = Array<MessageType>
export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}

type AddMessageActionType = { type: 'TEXT-NEW-MESSAGE' }
type UpdateMessageActionType = { type: 'SEND-NEW-MESSAGES', newText: string }
type AllActionsType = AddMessageActionType | UpdateMessageActionType

let initialState = {
    dialogs: [
        {id: 1, name: 'Anna'},                  /*Обьекты с данными*/
        {id: 2, name: 'Marry'},               /*   выносим с  Dialogs.tsx*/
        {id: 3, name: 'Lorraine'},
        {id: 4, name: 'Rachel'},
        {id: 5, name: 'Alina'}
    ],
    messages: [
        {id: 1, message: 'Hi! How are you doing?'},
        {id: 2, message: 'Whats up!'},
        {id: 3, message: 'Lets go for coffee!'},             /*Обьекты с данными*/
        {id: 4, message: 'I miss you..!'},                  /*выносим с  Dialogs.tsx*/
        {id: 5, message: 'How are you?'},
    ],
    newMessageBody: ""
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: AllActionsType): DialogsPageType => {
    let stateCopy
    switch (action.type) {
        case 'TEXT-NEW-MESSAGE':

            let newMessage = {
                id: 6,
                message: state.newMessageBody
            }
            stateCopy = {
                ...state,
                messages: [...state.messages, newMessage],
                textNewMessages: ""
            }
            return stateCopy;

        case 'SEND-NEW-MESSAGES':
            return {...state, newMessageBody: action.newText}

        default:
            return state
    }
}

export const addMessageAC = (): AddMessageActionType => ({type: 'TEXT-NEW-MESSAGE'})
export const updateMessageAC = (newText: string): UpdateMessageActionType => ({type: 'SEND-NEW-MESSAGES', newText})

export default dialogsReducer