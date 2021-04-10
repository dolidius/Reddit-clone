import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDetails = ({
    avatar,
    background,
    login,
    description,
    joinedDate,
    editable
}) => (

    <div className="profile__info">

        <div className="profile__background-image">
            <img src={background} alt=""/>
        </div>

        <div className="profile__avatar">
            <img src={avatar} alt=""/>
        </div>

        <div className="profile__name">
            <Link to={`/u/${login}`}>u/{login}</Link>
        </div>

        <div className="profile__description">{description}</div>

        {editable &&
            <div className="profile__edit">
                <Link to={`/u/${login}/edit`} className="button button--sm button--blue">Edit</Link>
            </div>
        }

    </div>
)

export default ProfileDetails;