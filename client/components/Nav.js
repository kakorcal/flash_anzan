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
        <Link to='/auth/login'>
          <button className='btn btn-lg flash-btn flash-bg-orange flash-co-cream'>
            LOGIN
          </button>
        </Link>
        <Link to='/auth/signup'>
          <button className='btn btn-lg flash-btn flash-bg-orange flash-co-cream'>
            SIGNUP
          </button>
        </Link>
      </div>
    );

    const userLinks = (
      <div className='flash-btn-group'>
        <Link to='/user' className='nav-link flash-co-cream'>
          <button className='btn btn-lg flash-btn flash-bg-orange'>
            PROFILE
          </button>
        </Link>
        <a href='#' onClick={this.logout.bind(this)}>
          <button className='btn btn-lg flash-btn flash-bg-orange flash-co-cream'>
            LOGOUT
          </button>
        </a>
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