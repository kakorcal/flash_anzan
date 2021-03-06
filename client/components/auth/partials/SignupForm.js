import React, {Component} from 'react'
import validateInput from '../../../utils/validations/signup'
import TextFieldGroup from './common/TextFieldGroup'
import {browserHistory} from 'react-router'
import setAuthorizationToken from '../../../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'

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
    // this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e){
    if(Object.keys(this.state.errors)) this.setState({errors: {}});
    this.setState({[e.target.name]: e.target.value});
  }

  // checkUserExists(e){
  //   const field = e.target.name;
  //   const value = e.target.value;

  //   if(value !== ''){
  //     this.props.isUserExists(value).then(res => {
  //       let errors = this.state.errors;
  //       let inValid;
  //       if(res.data.user){
  //         errors[field] = 'There is user with such ' + field;
  //         inValid = true;
  //       }else{
  //         errors[field] = '';
  //         inValid = false;
  //       }

  //       this.setState({errors, inValid});
  //     });
  //   }
  // }

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
        .then(res => {
          console.log(res.data);
          const {token, X_MASHAPE_KEY} = res.data;
          const newuser = jwt.decode(token);
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          this.props.setCurrentUser(newuser);
          // TODO: Handle errors on catch
          this.props.setRoboHashThumbnail(newuser._id, X_MASHAPE_KEY)
            .then(previousData => {
              this.props.addFlashMessage({
                type: 'success',
                text: 'You have successfully signed in.'
              });
              browserHistory.push('/');
            })
            .catch(err => {
              this.props.addFlashMessage({
                type: 'success',
                text: 'You have successfully signed in.'
              });
              this.props.addFlashMessage({
                type: 'error',
                text: 'Please goto the profile page to update your avatar.'
              });
              browserHistory.push('/');
            });
          
        }).catch(err=>{
          const message = err.response.data.error;
          console.log(err.response.data);
          if(err.response.status >= 500){
            this.props.addFlashMessage({
              type: 'error',
              text: message
            });            
          }

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
          // checkUserExists={this.checkUserExists}
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
            disabled={this.state.isLoading} 
            className='btn btn-lg flash-btn flash-bg-blue flash-co-cream' 
            value='SUBMIT'
          />
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  setCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  setRoboHashThumbnail: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

export default SignupForm