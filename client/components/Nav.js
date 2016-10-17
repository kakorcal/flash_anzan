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
        <div className='auth-group'>
          <button className='btn flash-btn flash-bg-orange flash-co-yellow btn-lg'>LOGIN</button>
          <button className='btn flash-btn flash-bg-orange flash-co-yellow btn-lg'>SIGNUP</button>
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