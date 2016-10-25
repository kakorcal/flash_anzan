import React, {Component} from 'react'
import Nav from './Nav'
import FlashMessagesList from './auth/partials/FlashMessagesList'

class App extends Component{
  render(){
    return (
      <div className='main-panel'>
        <Nav/>
        <FlashMessagesList/>
        {this.props.children}
      </div>
    );
  }
}

export default App