import React from 'react';

import isEmpty from '../../utils/validation';

export default function ProfileAbout(props) {
  const { profile } = props;
  const firstName = profile.user.name.trim().slice(0, profile.user.name.indexOf(' '));
  let skillSet = profile.skills.map((skill, i) => {
    return (
      <div key={i} className="p-3">
        <i className="fa fa-check"></i> {skill}
      </div>
    )
  })
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}'s bio</h3>
          <p className="lead">
            {isEmpty(profile.bio) ?
              (<span>{firstName} doesn't have a bio at this moment</span>)
              : profile.bio}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skillSet}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
