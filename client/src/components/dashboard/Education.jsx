import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import * as actionCreators from '../../rdx_actions/';


class Education extends Component {
  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(id) {
    this.props.onDeleteEducation(id);
  }

  render() {
    const education = this.props.education.map((edu) => {
      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - {edu.to === null ? 'Now' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
          </td>
          <td>
            <button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    })
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">School</th>
              <th scope="col">Degree</th>
              <th scope="col">Years</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {education}
          </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  onDeleteEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteEducation: (id) => dispatch(actionCreators.deleteEducation(id))
  }

}

export default connect(null, mapDispatchToProps)(Education);
