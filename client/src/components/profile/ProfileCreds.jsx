import React from 'react';
import Moment from 'react-moment';

import isEmpty from '../../utils/validation';

export default function ProfileCreds(props) {
  const { experience, education } = props.profile;
  const profileCredentials = experience.map((cred, i) => {
    return (
      <li key={i} className="list-group-item">
        <h4>{isEmpty(cred.company) ? null : cred.company}</h4>
        <p>
          <Moment format='MMM YYYY'>{cred.from}</Moment> - {cred.to === null ? 'Now' : <Moment format='MMM YYYY'>{cred.to}</Moment>}
        </p>
        <p><strong>Position:</strong> {cred.title}</p>
        <p><strong>Location:</strong> {cred.location === '' ? null : cred.location}</p>
        <p><strong>Description:</strong> {cred.description === '' ? null : cred.description}</p>
      </li >
    )
  });
  const profileEducation = education.map((edu, i) => {
    return (
      <li key={i} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format='MMM YYYY'>{edu.from}</Moment> - {edu.to === null ? 'Now' : <Moment format='MMM YYYY'>{edu.to}</Moment>}

        </p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field Of Study: </strong>{edu.fieldofstydy}</p>
        <p><strong>Description:</strong> {isEmpty(edu.description) ? null : edu.description}</p>
      </li>
    )
  });

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {profileCredentials.length > 0 ? profileCredentials : (<p className='text-center'>No experience listed</p>) }
        </ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {profileEducation.length > 0 ? profileEducation : (<p className='text-center'>No education listed</p>)}
        </ul>
      </div>
    </div>
  )
}
