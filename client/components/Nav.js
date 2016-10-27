import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../redux/actions/auth'
import {addFlashMessage} from '../redux/actions/flashMessages'

class Nav extends Component{
  logout(e){
    e.preventDefault();
    this.props.logout();
    this.props.addFlashMessage({
      type: 'success',
      text: 'You have successfully logged out.'
    });
  }

  render(){
    const {isAuthenticated} = this.props.auth;

    const guestLinks = (
      <div className='flash-btn-group'>
        <button className='btn btn-lg flash-btn flash-bg-orange'>
          <Link to='/auth/login' className='nav-link flash-co-cream'>LOGIN</Link>
        </button>
        <button className='btn btn-lg flash-btn flash-bg-orange'>
          <Link to='/auth/signup' className='nav-link flash-co-cream'>SIGNUP</Link>
        </button>
      </div>
    );

    const userLinks = (
      <div className='flash-btn-group'>
        <button className='btn btn-lg flash-btn flash-bg-orange'>
          <Link to='/user' className='nav-link flash-co-cream'>PROFILE</Link>
        </button>
        <button className='btn btn-lg flash-btn flash-bg-orange'>
          <a href='#' className='nav-link flash-co-cream' 
            onClick={this.logout.bind(this)}
          >LOGOUT</a>
        </button>
      </div>
    );

    return (
      <div className='top-nav'>
        <div className='logo'>
          <Link to='/'>
            <h1>FLASH</h1>
            <h1 className='flash'>
              <i className='fa fa-flash'></i>
            </h1>
            <h1>ANZAN</h1>            
          </Link>
        </div>
        {isAuthenticated ? userLinks : guestLinks}
        <div className='description'>
          <h5>Find The Sum Of The Flashing Numbers!</h5>
          <h5><a href="https://github.com/kakorcal/flash_anzan" target='_blank'>https://github.com/kakorcal/flash_anzan</a></h5>
        </div>
      </div>
    );
  }
}

// we expect auth to be in the component 
Nav.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

// get a slice of the redux store
function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout, addFlashMessage})(Nav);