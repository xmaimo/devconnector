import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import * as actionCreators from '../../rdx_actions/';


import ProfileActions from './ProfileActions';
import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentWillMount = () => {
    this.props.onGetCurrentProfile()
  }

  onDeleteClick(evt) {
    this.props.onDeleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // check if loged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>

            <ProfileActions />

            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: '60px' }}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
            </div>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link className='btn btn-lg btn-info' to='/create-profile'>Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>

              {dashboardContent}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  onGetCurrentProfile: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentProfile: () => dispatch(actionCreators.getCurrentProfile()),
    onDeleteAccount: () => dispatch(actionCreators.deleteAccount())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);