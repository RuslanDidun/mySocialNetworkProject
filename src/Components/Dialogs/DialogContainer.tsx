import React from 'react'
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {AppStateType} from "../../Redux/redux-store"
import {compose} from 'redux'
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {actions} from "../../Redux/dialogs-reducer";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
}
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    WithAuthRedirect
)(Dialogs)