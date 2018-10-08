import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = (props) => {
  console.log(props);

  return (
    <div className="form-group">
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", { 'is-invalid': props.error })}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange} />

      {props.info && <small className='form-text text-muted'>{props.info}</small>}
      {props.error && (<div className="invalid-feedback">{props.error}</div>)}
    </div>
  )
}

TextFieldGroup.proptypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
