import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth:state.auth.isAuth
});

type AuthRedirectType = {
    isAuth: any
}

export const WithAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component<AuthRedirectType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />

            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}

