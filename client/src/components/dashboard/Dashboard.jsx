import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import * as actionCreators from '../../rdx_actions/';

import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.onGetCurrentProfile()
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
        dashboardContent = (<h4>DISPLAY PROFILE</h4>)
      } else {
        // USer is logged in but has no profile
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

Dashboard.prototypes = {
  onGetCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentProfile: () => dispatch(actionCreators.getCurrentProfile())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);