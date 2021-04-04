import React from 'react';
import './App.css';
import Header from "./Components/Header/Header"
import Nav from "./Components/Navbar/Nav";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";
import {Route} from 'react-router-dom';
import Music from "./Components/Navbar/Music/Music";
import News from "./Components/Navbar/News/News";
import Settings from "./Components/Navbar/Settings/Settings";
import {DialogsType, MessagesType, PostType, RootStateType} from "./Redux/state";

type AppPropsType = {
    state: RootStateType
    addPost: (newText: string) => void
    posts: Array<PostType>
    dialogs:Array<DialogsType>
    messages: Array<MessagesType>
}

const App = (props:AppPropsType) => {

    return (
        <div className="app-wrapper">
            <Header/>                   {/*<Dialogs dialogs={props.state.dialogs}*/}
                                                {/*messages={props.state.message}/>}/>*/}
            <Nav/>
            <div className="app-wrapper-content">
                <Route exact path="/dialogs"
                       render={() => <Dialogs dialogs={props.dialogs}    /*state.dialogPage.*/
                                                messages={props.state.dialogPage.messages}/>}/>
                <Route exact path="/profile"
                       render={() => <Profile addPost={props.addPost}
                                              posts={props.state.profilePage.posts}/>}/>
                <Route exact path="/music"
                       render={() => <Music/>}/>
                <Route exact path="/news"
                       render={() => <News/>}/>
                <Route exact path="/settings"
                       render={() => <Settings/>}/>
            </div>

        </div>
    )
}

export default App;
