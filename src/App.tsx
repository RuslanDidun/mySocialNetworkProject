import React, {Component} from 'react'
import './App.css'
import 'antd/dist/antd.css'
import {BrowserRouter, NavLink, Redirect, Route, Switch, withRouter} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import store, {AppStateType} from "./redux/redux-store"
import {withSuspense} from "./hoc/withSuspense"
import {UsersPage} from "./components/Users/UsersContainer"
import {LoginPage} from "./components/Login/Login";

import {Col, Layout, Menu, Row} from 'antd';
import {
    CustomerServiceOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    WechatOutlined
} from '@ant-design/icons'
import {AppHeader} from "./components/Header/Header";

//ant design const
const {Header, Sider, Content} = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends Component<MapPropsType & DispatchPropsType> {

    state = {
        collapsed: false,
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occurred")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <NavLink to="/profile">Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TeamOutlined/>}>
                            <NavLink to="/users">Users</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<WechatOutlined/>}>
                            <NavLink to="/dialogs">Messages</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<CustomerServiceOutlined/>}>
                            Music
                        </Menu.Item>
                        <Menu.Item key="5" icon={<SettingOutlined/>}>
                            Settings
                        </Menu.Item>
                    </Menu>

                </Sider>
                <Layout className="site-layout">

                    <Header className="site-layout-background" style={{padding: 0}}>
                        <Row>
                            <Col span={18}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                })}
                            </Col>
                            <Col span={6}>
                                <AppHeader/>
                            </Col>
                        </Row>
                    </Header>

                    <Content className="site-layout-background"
                             style={{
                                 margin: '24px 16px',
                                 padding: 24,
                                 minHeight: 480,
                             }}>
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={"/profile"}/>}/>
                            <Route path='/dialogs'
                                   render={() => <SuspendedDialogs/>}/>
                            <Route path='/profile/:userId?'
                                   render={() => <SuspendedProfile/>}/>
                            <Route path='/users'
                                   render={() => <UsersPage pageTitle={"Samurais"}/>}/>
                            <Route path='/login'
                                   render={() => <LoginPage/>}/>
                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp
