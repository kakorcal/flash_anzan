import React, {Component} from 'react'
import SignupForm from './partials/SignupForm'
import {connect} from 'react-redux'
import {userSignupRequest, isUserExists} from '../../redux/actions/signup'
import {setRoboHashThumbnail} from '../../redux/actions/auth'
import {setCurrentUser} from '../../redux/actions/auth'
import {addFlashMessage} from '../../redux/actions/flashMessages'

class Signup extends Component{
  render(){
    return (
      <div className='signup'>
        <h1>Signup</h1>
        <hr/>
        <SignupForm 
          userSignupRequest={this.props.userSignupRequest}
          addFlashMessage={this.props.addFlashMessage}
          isUserExists={this.props.isUserExists}
          setCurrentUser={this.props.setCurrentUser}
          setRoboHashThumbnail={this.props.setRoboHashThumbnail}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  setRoboHashThumbnail: React.PropTypes.func.isRequired,
  setCurrentUser: React.PropTypes.func.isRequired
};
// can pass null if you don't need the redux store
export default connect(null, {userSignupRequest, addFlashMessage, isUserExists, setCurrentUser, setRoboHashThumbnail})(Signup);