import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmpty from '../../utils/validation';

const ProfileItem = (props) => {
  const profile = props.profiles.map((profile) => {
    const profileSkills = profile.skills.slice(0, 4).map((skill, i) => {
      return (
        <li key={i} className='list-group-item'>
          <i className="fa fa-check pr-1"></i>{skill}
        </li>
      )
    });

    return (
      <div key={profile._id} className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status} {isEmpty(profile.company) ? null : <span> at {profile.company}</span>}</p>
            <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profileSkills}
            </ul>
          </div>
        </div>
      </div>
    )
  })

  return profile;
}

ProfileItem.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default ProfileItem

