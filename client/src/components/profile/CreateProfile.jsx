import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

import * as actionCreators from '../../rdx_actions';

export class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.onCreateProfile(newProfile, this.props.history)
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder='Facebook Profile URL'
            name='facebook'
            icon='fab fa-facebook'
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook} />

          <InputGroup
            placeholder='Twitter Profile URL'
            name='twitter'
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter} />

          <InputGroup
            placeholder='LinkeIn Profile URL'
            name='linkedin'
            icon='fab fa-linkedin'
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin} />

          <InputGroup
            placeholder='Youtube Profile URL'
            name='youtube'
            icon='fab fa-youtube'
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube} />

          <InputGroup
            placeholder='Instagram Profile URL'
            name='instagram'
            icon='fab fa-instagram'
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram} />
        </div>
      )
    }

    const selectOptions = [
      { value: '0', label: '* Select Professional Status' },
      { value: 'Developer', label: 'Developer' },
      { value: 'Junior Developer', label: 'Junior Developer' },
      { value: 'Senior Developer', label: 'Senior Developer' },
      { value: 'Manager', label: 'Manager' },
      { value: 'Student or Learning', label: 'Student or Learning' },
      { value: 'Instructor', label: 'Instructor or Teacher' },
      { value: 'Intern', label: 'Intern' },
      { value: 'Other', label: 'Other' },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className="btn btn-light">Go Back</Link>

              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>

              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="* Profile handle"
                    name="handle"
                    value={this.state.handle}
                    error={errors.handle}
                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <SelectListGroup
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    info='Give us an idea of where you are at in your career'
                    options={selectOptions} />

                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    error={errors.company}
                    info="Could be your own company or one you work for"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    error={errors.website}
                    info="Could be your own or a company website"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    error={errors.location}
                    info="City &amp; state suggested (eg. Boston, MA)"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    error={errors.skills}
                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    error={errors.githubusername}
                    info="If you want your latest repos and a Github link, include your username"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={this.state.bio}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                    onChange={this.onChange} />
                </div>

                <div className="mb-3">
                  <button
                    onClick={() => this.setState((prevState) => ({ displaySocialInputs: !prevState.displaySocialInputs }))}
                    type="button"
                    className="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input type="submit" className="btn btn-info btn-block mt-4" />

              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

CreateProfile.proptypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateProfile: (newProfile, history) => dispatch(actionCreators.createProfile(newProfile, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));
