import React, {Component} from 'react'
import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from './common/TextFieldGroup'
import {browserHistory} from 'react-router'

class SignupForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
      inValid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e){
    if(Object.keys(this.state.errors)) this.setState({errors: {}});
    this.setState({[e.target.name]: e.target.value});
  }

  checkUserExists(e){
    const field = e.target.name;
    const value = e.target.value;

    if(value !== ''){
      this.props.isUserExists(value).then(res => {
        let errors = this.state.errors;
        let inValid;
        if(res.data.user){
          errors[field] = 'There is user with such ' + field;
          inValid = true;
        }else{
          errors[field] = '';
          inValid = false;
        }

        this.setState({errors, inValid});
      });
    }
  }

  isValid(){
    const {errors, isValid} = validateInput(this.state);
    if(!isValid) this.setState({errors});
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.isValid()){
      this.setState({isLoading: true});
      this.props.userSignupRequest(this.state)
        .then(res=>{
          console.log(res.data);
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have successfully signed in.'
          });
          browserHistory.push('/');
        }).catch(err=>{
          console.log(err.response.data);
          this.setState({errors: err.response.data, isLoading: false});
        });
    }
  }

  render(){
    const {errors} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          label='Username'
          field='username'
          error={errors.username}
          value={this.state.username}
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
        />
        <TextFieldGroup
          label='Password'
          type='password'
          field='password'
          error={errors.password}
          value={this.state.password}
          onChange={this.onChange}
        />
        <div className="form-group">
          <input type="submit" 
            disabled={this.state.isLoading || this.state.inValid} 
            className='btn btn-primary btn-lg' 
            value='Submit'
          />
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

export default SignupForm