import React, {Component} from 'react'
import Rules from './views/Rules'
import Pregame from './views/Pregame'
import Countdown from './views/Countdown'
import Play from './views/Play'
import Endgame from './views/Endgame'
import {connect} from 'react-redux'

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentView: 'pregame'
    };

    this.changeView = this.changeView.bind(this);
  }

  setView(currentView){
    switch(currentView){
      case 'rules':
        return <Rules changeView={this.changeView}/>;
      case 'pregame':
        return <Pregame changeView={this.changeView}/>;
      case 'countdown':
        return <Countdown changeView={this.changeView}/>;
      case 'play':
        return <Play changeView={this.changeView}/>;
      case 'endgame':
        return <Endgame changeView={this.changeView}/>;
    }
  }

  changeView(currentView){
    this.setState({currentView});
  }

  render(){
    let currentView = this.setView(this.state.currentView);

    return (
      <div className='game-container flash-bg-black flash-co-white'>
        {currentView}
      </div>
    );
  }
}

export default Main