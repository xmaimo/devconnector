import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import * as actionCreators from '../../rdx_actions/';


class Experience extends Component {
  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.onDeleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map((exp) => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - {exp.to === null ? 'Now' : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}
          </td>
          <td>
            <button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    })
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experience}
          </tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  onDeleteExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExperience: (id) => dispatch(actionCreators.deleteExperience(id))
  }

}

export default connect(null, mapDispatchToProps)(Experience);
