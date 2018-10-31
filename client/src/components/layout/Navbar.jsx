import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import * as actionCreators from '../../rdx_actions/index';

class Navbar extends Component {
  onLogoutClick(evt) {
    evt.preventDefault();
    this.props.onClearCurrentProfile();
    this.props.onLogoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    let authLinks = null;

    if (isAuthenticated) {
      authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}>
              <img className='avatar rouded' src={user.avatar} alt="avatar" title='You must have a Gravatar' />
              Logout
            </Link>
          </li>
        </ul>
      )
    } else {
      authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      )
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers</Link>
              </li>
            </ul>

            {authLinks}

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.proptypes = {
  auth: PropTypes.object.isRequired,
  onLogoutUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUser: () => dispatch(actionCreators.logoutUser()),
    onClearCurrentProfile: () => dispatch(actionCreators.clearCurrentProfile())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
