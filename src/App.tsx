import React from 'react';
import './App.css';
import Header from "./Components/Header/Header"
import Nav from "./Components/Navbar/Nav";
import {Route} from 'react-router-dom';
import Music from "./Components/Navbar/Music/Music";
import News from "./Components/Navbar/News/News";
import DialogsContainer from "./Components/Dialogs/DialogContainer";
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileInfo/ProfileContainer";


const App = () => {

    return (
        <div className="app-wrapper">
            <Header/>
            <Nav/>

            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                <Route path="/profile/:userId" render={() => <ProfileContainer/>}/>
                <Route path="/music" render={() => <Music/>}/>
                <Route path="/news" render={() => <News/>}/>
                <Route path="/users" render={() => <UsersContainer/>}/>
                <Route path="/login" render={() => <UsersContainer/>}/>
            </div>
        </div>
    )
}

export default App;
