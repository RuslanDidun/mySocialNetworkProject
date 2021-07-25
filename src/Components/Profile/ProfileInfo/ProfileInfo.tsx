import React from 'react';
import p from './ProfileInfo.module.css';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitj03uyKw5eqdJ4tnBDgalRCG2xB7UHPmFw&usqp=CAU"
                    alt=""/>
            </div>
            <div className={p.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                ava + description
                <ProfileStatusWithHooks status={props.status}
                               updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
 return <div></div>
}

export default ProfileInfo;