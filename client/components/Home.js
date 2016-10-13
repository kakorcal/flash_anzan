import React, {Component} from 'react'
import HomeNav from './navs/home'

class Home extends Component{
  render(){
    return (
      <div>
        Home Component
        <HomeNav/>
        <i className='fa fa-star'></i>
      </div>
    );
  }
}

export default Home