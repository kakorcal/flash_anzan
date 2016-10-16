import React, {Component} from 'react'
import HomeNav from './navs/home'

class Home extends Component{
  render(){
    var center = {textAlign: 'center'};
    return (
      <div style={center}>
        <h1>FLASH</h1>
        <h1>
          <i className='fa fa-angle-double-left'></i>
          <i className='fa fa-flash'></i>
          <i className='fa fa-angle-double-right'></i>
        </h1>
        <h1>ANZAN</h1>
        <HomeNav/>
      </div>
    );
  }
}

export default Home