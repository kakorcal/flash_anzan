import React, {Component} from 'react'
import About from './views/About'
import Pregame from './views/Pregame'
import Countdown from './views/Countdown'
import Play from './views/Play'
import Judge from './views/Judge'
import Endgame from './views/Endgame'
import Finish from './views/Finish'
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
      case 'about':
        return <About changeView={this.changeView}/>;
      case 'pregame':
        return <Pregame changeView={this.changeView}/>;
      case 'countdown':
        return <Countdown changeView={this.changeView}/>;
      case 'play':
        return <Play changeView={this.changeView}/>;
      case 'judge':
        return <Judge changeView={this.changeView}/>;
      case 'endgame':
        return <Endgame changeView={this.changeView}/>;
      case 'finish':
        return <Finish changeView={this.changeView} isAuthenticated={this.props.isAuthenticated}/>;
      default: 
        return <Pregame changeView={this.changeView}/>;
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

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Main)