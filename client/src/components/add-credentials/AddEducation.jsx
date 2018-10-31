import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import * as actionCreators from '../../rdx_actions/';

class AddEducation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      description: '',
      current: false,
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      description: this.state.description,
      current: this.state.current,
      disabled: this.state.disabled
    };

    this.props.onAddEducation(eduData, this.props.history)
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required field</small>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='* School Or Bootcamp'
                    name='school'
                    value={this.state.school}
                    error={errors.school}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='* Degree Or Certificate'
                    name='degree'
                    value={this.state.degree}
                    error={errors.degree}
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder='* Field Of Study'
                    name='fieldofstudy'
                    value={this.state.fieldofstudy}
                    error={errors.fieldofstudy}
                    onChange={this.onChange} />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type='date'
                    name='from'
                    value={this.state.from}
                    error={errors.from}
                    onChange={this.onChange} />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type='date'
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
                    placeholder='Program Description'
                    name='description'
                    value={this.state.description}
                    error={errors.description}
                    onChange={this.onChange} />
                  <small className="form-text text-muted">Tell us about your experience and what you learned</small>
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onAddEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEducation: (eduData, history) => dispatch(actionCreators.addEducation(eduData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation))