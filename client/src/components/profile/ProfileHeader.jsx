import React from 'react';

import isEmpty from '../../utils/validation';

function ProfileHeader(props) {
  const { profile } = props;
  let socialMediaIcons = null;

  if (!isEmpty(profile.social)) {
    socialMediaIcons = Object.keys(profile.social).map((icon, index) => {
      return (
        <a key={index} className="text-white p-2" href={profile.social[icon]}>
          <i className={`fab fa-${icon} fa-2x`}></i>
        </a>
      )
    });
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img className="rounded-circle" src={profile.user.avatar} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p>{profile.status} {isEmpty(profile.company) ? null : <span> at {profile.company}</span>}</p>
            <p>{isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
            <div>
              {isEmpty(profile.website) ? null : (
                // TODO: modify the http URL
                <a className="text-white p-2" href={`http://${profile.website}`} target='_blank'>
                  <i className={`fas fa-globe  fa-2x`}></i>
                </a>
              )}
              {socialMediaIcons}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default ProfileHeader;