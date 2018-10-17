import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from "react-redux";

import * as actionCreators from '../../rdx_actions/';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  onSubmit(evt) {
    evt.preventDefault();
    const loggedInUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.onloginUser(loggedInUser);
    this.setState({ errors: {} })
  }

  render() {
    const { email, password } = this.props.errors;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type={"email"}
                  className={classnames("form-control form-control-lg", { 'is-invalid': email })}
                  placeholder="Email Address"
                  name="email"
                  error={email}
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  type="password"
                  className={classnames("form-control form-control-lg", { 'is-invalid': password })}
                  placeholder="Password"
                  name="password"
                  error={password}
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  onloginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onloginUser: (loginUser) => dispatch(actionCreators.loginUser(loginUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);