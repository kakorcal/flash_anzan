import React, {Component} from 'react'
import TextFieldGroup from './common/TextFieldGroup'
import validateInput from '../../../utils/validations/login'
import {connect} from 'react-redux'
import {login, setCurrentUser} from '../../../redux/actions/auth'
import {addFlashMessage} from '../../../redux/actions/flashMessages'
import {browserHistory} from 'react-router'
import setAuthorizationToken from '../../../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'

/*
  form state:
    fields, errors, isLoading
  handlers: 
    onSubmit, onChange
  form validations: 
    do server side validation first before client
    if valid, dispatch thunk action and handle response

*/

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    const {errors, isValid} = validateInput(this.state);

    if(!isValid){
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if(this.isValid()){
      this.setState({errors: {}, isLoading: true});
      this.props.login(this.state)
        .then(res => {
          console.log(res.data);
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          
          this.props.setCurrentUser(jwt.decode(token));

          this.props.addFlashMessage({
            type: 'success',
            text: 'You have successfully logged in.'
          });
          browserHistory.push('/');
        })
        .catch(err => {
          console.log(err.response.data);
          this.setState({errors: err.response.data, isLoading: false});
        });
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    const {errors, identifier, password, isLoading} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        {errors.form && <div className='alert alert-danger'>{errors.form}</div>}
        <TextFieldGroup 
          field='identifier'
          label='Username'
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}/>

        <TextFieldGroup 
          field='password'
          type='password'
          label='Password'
          value={password}
          error={errors.password}
          onChange={this.onChange}/>

        <div className="form-group">
          <input type="submit" 
            disabled={isLoading} 
            className='btn btn-lg flash-btn flash-bg-blue flash-co-cream' 
            value='SUBMIT'
          />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  setCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, {login, setCurrentUser, addFlashMessage})(LoginForm);