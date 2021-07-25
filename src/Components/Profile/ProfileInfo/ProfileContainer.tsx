import React from 'react';
import Profile from '../Profile';
import {getStatusTC, getUserProfileTC, updateStatusTC} from "../../../Redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfileTC(userId)
        this.props.getStatusTC(userId)
    }


    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose(
    connect(mapStateToProps, {getUserProfileTC, getStatusTC, updateStatusTC}),
    withRouter, WithAuthRedirect)(ProfileContainer);
