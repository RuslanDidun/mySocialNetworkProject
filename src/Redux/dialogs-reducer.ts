import {InferActionsType} from "./redux-store"

export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number
    name: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Anna'},                  /*Обьекты с данными*/
        {id: 2, name: 'Marry'},               /*   выносим с  Dialogs.tsx*/
        {id: 3, name: 'Lorraine'},
        {id: 4, name: 'Rachel'},
        {id: 5, name: 'Alina'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi! How are you doing?'},
        {id: 2, message: 'Whats up!'},
        {id: 3, message: 'Lets go for coffee!'},             /*Обьекты с данными*/
        {id: 4, message: 'I miss you..!'},                  /*выносим с  Dialogs.tsx*/
        {id: 5, message: 'How are you?'},
    ] as Array<MessageType>,
}

export const dialogsReducer = (state  = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/TEXT-NEW-MESSAGE':

            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}

// action creator wrapped in const obj -> and type infer
export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/TEXT-NEW-MESSAGE',newMessageBody} as const)
}
export type InitialStateType = typeof  initialState
type ActionsType = InferActionsType<typeof actions>

export default dialogsReducer