import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {addMessageAC, updateMessageAC} from "../../Redux/dialogs-reducer";

let mapStateToProps = (state:AppStateType) => ({...state.dialogPage})

const DialogsContainer = connect(mapStateToProps,{addMessageAC, updateMessageAC})(Dialogs);

export default DialogsContainer;