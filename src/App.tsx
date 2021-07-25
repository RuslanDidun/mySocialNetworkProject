import React, {Component} from 'react';
import './App.css';
import Header from "./Components/Header/Header"
import Nav from "./Components/Navbar/Nav";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Music from "./Components/Navbar/Music/Music";
import News from "./Components/Navbar/News/News";
import DialogsContainer from "./Components/Dialogs/DialogContainer";
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from "./Components/Profile/ProfileInfo/ProfileContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from 'redux';
import {initializeApp} from "./Redux/app-reducer";
import {store} from "./Redux/redux-store";


class App extends Component {
    componentDidMount() {
        this.props.setAuthUserData();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

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
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

let SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp