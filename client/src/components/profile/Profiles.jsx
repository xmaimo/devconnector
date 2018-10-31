import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

import * as actionCreators from '../../rdx_actions/';

export class Profiles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profiles: []
    }
  }

  componentDidMount() {
    this.props.getAllProfiles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profiles) {
      this.setState({
        profiles: nextProps.profile.profiles
      })
    }
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = (
          <ProfileItem profiles={this.state.profiles} />
        )
      } else {
        profileItems = (<h4>No profiles found....</h4>)
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>

              {profileItems}

            </div>
          </div>
        </div>
      </div>
    )
  }
}


Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProfiles: () => dispatch(actionCreators.getProfiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
