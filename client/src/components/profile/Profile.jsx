import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';

import * as actionCreators from '../../rdx_actions/';

export class Profile extends Component {
  componentWillMount() {
    const { handle } = this.props.match.params;
    if (handle) this.props.onGetProfileByHandle(handle);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.profile === null && this.props.profile.loading){
      this.props.history.push('/not-found')
    }
  }

  render() {
    const { loading, profile } = this.props.profile;
    let profileItem;

    if (profile === null || loading) {
      profileItem = <Spinner />
    } else {
      profileItem = (
        <div>
          <div className="row">
            <div className="col-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
            </div>
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds profile={profile} />
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  onGetProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProfileByHandle: (handle) => (dispatch(actionCreators.getProfileByHandle(handle)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
