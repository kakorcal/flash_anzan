import React, {Component} from 'react'
import {Link} from 'react-router'

class HomeNav extends Component{
  render(){
    return (
      <div>
        <div>
          <Link to='/start'>START</Link>
        </div>
        <div>
          <Link to='/about'>ABOUT</Link>
        </div>
      </div>
    );
  }
}

export default HomeNav