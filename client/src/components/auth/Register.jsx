import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';


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

    this.props.onRegisterUser(newUser)
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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", { 'is-invalid': name })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} />

                  {name && (<div className="invalid-feedback">{name}</div>)}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", { 'is-invalid': email })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} />
                  {email && (<div className="invalid-feedback">{email}</div>)}

                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", { 'is-invalid': password })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange} />
                  {password && (<div className="invalid-feedback">{password}</div>)}

                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", { 'is-invalid': password2 })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange} />
                  {password2 && (<div className="invalid-feedback">{password2}</div>)}

                </div>
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
    onRegisterUser: (user) => dispatch(actionCreators.registerUser(user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);