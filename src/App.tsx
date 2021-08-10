import React, {Component} from 'react'
import './App.css'
import Header from "./Components/Header/Header"
import Nav from "./Components/Navbar/Nav"
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'

import UsersContainer from './Components/Users/UsersContainer'
import Login from "./Components/Login/Login"
import {connect, Provider} from "react-redux"
import {compose} from 'redux'
import {initializeApp} from "./Redux/app-reducer"
import {AppStateType, store} from "./Redux/redux-store"
import Preloader from './Components/common/Preloader/Preloader'
import ProfileContainer from "./Components/Profile/ProfileContainer"
import {withSuspense} from "./hoc/withSuspense";
import DialogContainer from "./Components/Dialogs/DialogContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
const SuspendedDialogs = withSuspense(DialogContainer)
const SuspendedProfile = withSuspense(ProfileContainer)


class App extends Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occurred");
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/'
                               render={() => <Redirect to={"/profile"}/>}/>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs /> }/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile /> }/>
                        <Route path='/users'
                               render={() => <UsersContainer pageTitle={"SocialNetwork"}/>}/>
                        <Route path="/login" render={() => <Login/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp