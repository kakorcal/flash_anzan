import React, {Component} from 'react'
import LoginForm from './partials/LoginForm'

class Login extends Component{
  render(){
    return (
      <div>
        <h1>Login</h1>
        <hr/>
        <LoginForm/>
      </div>
    );
  }
}

export default Login