import validator from 'validator'
import {isEmpty} from 'lodash'

export default function validateInput(data){
  let errors = {};

  if(validator.isEmpty(data.username)){
    errors.username = 'This field is required';
  }
  if(validator.isEmpty(data.password)){
    errors.password = 'This field is required';
  }
  if(validator.isLength(data.password, {min: 1, max: 7})){
    errors.password = 'Password must have more than 7 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}