import React from 'react'
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {AppStateType} from "../../Redux/redux-store"
import {addMessageAC, updateMessageAC} from "../../Redux/dialogs-reducer"
import {WithAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from 'redux'

let mapStateToProps = (state: AppStateType) => ({
    ...state.dialogPage
})

export default compose(connect(mapStateToProps,
    {addMessageAC, updateMessageAC}),
    WithAuthRedirect
)(Dialogs)