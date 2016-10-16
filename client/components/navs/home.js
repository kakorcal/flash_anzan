import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {googleLogin} from '../../redux/actions/auth'

class HomeNav extends Component{
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e){
    this.props.googleLogin();
  }

  render(){
    return (
      <div className='btn-group-vertical'>
        <Link to='/start' className='btn btn-default'>
          <i className='fa fa-toggle-right'></i> START
        </Link>
        <Link to='/about' className='btn btn-default'>
          <i className='fa fa-book'></i> ABOUT
        </Link>
        <a className='btn btn-default' href='/auth/google'>
          <i className='fa fa-google'></i> LOGIN
        </a>
      </div>
    );
  }
}

export default connect(null, {googleLogin})(HomeNav);