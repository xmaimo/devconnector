import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={props.icon}></i>
        </span>
      </div>
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", { 'is-invalid': props.error })}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange} />

      {props.error && (<div className="invalid-feedback">{props.error}</div>)}
    </div>
  )
}

InputGroup.proptypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup