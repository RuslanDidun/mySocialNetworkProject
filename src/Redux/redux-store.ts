import {applyMiddleware, combineReducers, createStore} from "redux"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reduser"
import authReducer from "./auth-reducer"
import thunkMiddleWare from "redux-thunk"
import appReducer from "./app-reducer"

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

type RootReducerTYpe = typeof rootReducers; // (globalState:AppStateType) => AppStateType
export  type AppStateType = ReturnType<RootReducerTYpe>
export const store = createStore(rootReducers, applyMiddleware(thunkMiddleWare))
