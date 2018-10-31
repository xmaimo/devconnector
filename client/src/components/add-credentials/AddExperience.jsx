import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import * as actionCreators from '../../rdx_actions/';

class AddExperience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
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

  onCheck() {
    this.setState((prevState) => {
      return {
        current: !prevState.current,
        disabled: !prevState.disabled
      }
    })
  }

  onSubmit(evt) {
    evt.preventDefault();
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.onAddExperience(expData, this.props.history)
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='* Job Title'
                    name='title'
                    value={this.state.title}
                    error={errors.title}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='* Company'
                    name='company'
                    value={this.state.company}
                    error={errors.company}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='Location'
                    name='location'
                    value={this.state.location}
                    error={errors.location}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <h6>From Date</h6>
                  <TextFieldGroup
                    type='date'
                    placeholder='dd/mm/aaaa'
                    name='from'
                    value={this.state.from}
                    error={errors.from}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <h6>To Date</h6>
                  <TextFieldGroup
                    type='date'
                    placeholder='dd/mm/aaaa'
                    name='to'
                    value={this.state.to}
                    error={errors.to}
                    onChange={this.onChange}
                    disabled={this.state.disabled ? 'disabled' : ''} />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current" />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder='Job Description'
                    name='description'
                    value={this.state.description}
                    error={errors.description}
                    onChange={this.onChange} />
                  <small className="form-text text-muted">Some of your responsabilities, etc</small>
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onAddExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
  return {
    onAddExperience: (expData, history) => dispatch(actionCreators.addExperience(expData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))