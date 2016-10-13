import React, {Component} from 'react'
import HomeNav from './navs/home'

class Home extends Component{
  render(){
    return (
      <div>
        Home Component
        <HomeNav/>
      </div>
    );
  }
}

export default Home