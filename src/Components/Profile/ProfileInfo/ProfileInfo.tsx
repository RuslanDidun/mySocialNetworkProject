import React from 'react';
import p from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitj03uyKw5eqdJ4tnBDgalRCG2xB7UHPmFw&usqp=CAU"
                    alt=""/>
            </div>
            <div className={p.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;