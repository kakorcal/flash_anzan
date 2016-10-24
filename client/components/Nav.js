import React, {Component} from 'react'
import {Link} from 'react-router'

class Nav extends Component{
  render(){
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
        <div className='flash-btn-group'>
          <button className='btn btn-lg flash-btn flash-bg-orange'>
            <Link to='/auth/login' className='nav-link flash-co-cream'>LOGIN</Link>
          </button>
          <button className='btn btn-lg flash-btn flash-bg-orange'>
            <Link to='/auth/signup' className='nav-link flash-co-cream'>SIGNUP</Link>
          </button>
        </div>
        <div className='description'>
          <h5>Find The Sum Of The Flashing Numbers!</h5>
          <h5><a href="https://github.com/kakorcal/flash_anzan" target='_blank'>https://github.com/kakorcal/flash_anzan</a></h5>
        </div>
      </div>
    );
  }
}

export default Nav