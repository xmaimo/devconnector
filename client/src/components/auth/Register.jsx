import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';

import * as actionCreators from '../../rdx_actions/'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.onRegisterUser(newUser, this.props.history)
    this.setState({ errors: {} })
  }

  render() {
    const { name, email, password, password2 } = this.props.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  error={name}
                  value={this.state.name}
                  onChange={this.onChange} />

                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  name="email"
                  error={email}
                  info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                  value={this.state.email}
                  onChange={this.onChange} />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  error={password}
                  value={this.state.password}
                  onChange={this.onChange} />

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  error={password2}
                  value={this.state.password2}
                  onChange={this.onChange} />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  onRegisterUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterUser: (user, history) => dispatch(actionCreators.registerUser(user, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));