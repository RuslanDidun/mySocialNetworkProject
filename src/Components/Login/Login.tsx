import React from 'react';
import {connect} from "react-redux";
import { login } from '../../Redux/auth-reducer';
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    return (
        <form>
            <div>
                <Field placeholder={"Login"} name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field component={"input"} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email,formData.password,formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <form>
            <div>
                <h1>Login</h1>
                <LoginForm/>
            </div>
        </form>
    )
}
const mapStateToProps = (state) => {
    isAuth: state.auth.isAuth
}

export default connect(mapStateToProps,{login}) (Login);