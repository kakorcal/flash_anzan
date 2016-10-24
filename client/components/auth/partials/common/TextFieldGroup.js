import React, {Component} from 'react'

const TextFieldGroup = ({field, value, label, error, type, onChange, checkUserExists}) => {
  return (
    <div className="form-group">
      <label htmlFor={field} className='control-label'>{label}:</label>
      <input className='form-control' 
        type={type} 
        id={field} 
        name={field} 
        value={value}
        onChange={onChange}
        onBlur={checkUserExists}/>
      {error && <span className='help-block' style={{color:'red'}}>*{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func, // not required cause not all text fields need it
  error: React.PropTypes.string
};
// input type is usually text so we set that as default
TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup