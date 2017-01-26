import React, {Component} from 'react'
import {Link} from 'react-router'

class NotFound extends Component{
  render(){
    return (
      <div>
        <h1>Whoops!</h1>
        <hr/>
        <p>Seems like you ended up in the wrong place</p>
        <p><Link to='/'>Click here</Link> to go back and play the game</p>
      </div>
    );
  }
}

export default NotFound