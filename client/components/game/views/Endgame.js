import React, {Component} from 'react'
import {connect} from 'react-redux'

class Endgame extends Component{
  constructor(props){
    super(props);
    this.state = {
      timerId: null
    };
  }

  changeView(view){
    this.props.changeView(view);
  }

  startTimer(){
    var timerId = window.setTimeout(() => {
      console.log('FINISH');
      this.changeView('finish');
    }, 1800);
    this.setState({timerId});
  }

  displayResultIcon(){
    if(this.props.game.result === 'win'){
      if(this.props.audio.volume) this.props.audio.correct.play();
      return <h1><i className='fa fa-circle-o fa-5x flash-co-green'/></h1>;
    }else{
      // starting audio from .5 seconds to eliminate quiet interval
      if(this.props.audio.volume) {
        var id = this.props.audio.wrong.play();
        this.props.audio.wrong.seek(0.5, id);
      }
      return <h1><i className='fa fa-remove fa-5x flash-co-red'/></h1>;
    }
  }

  componentWillMount(){
    console.log('START TIMER');
    this.startTimer();
  }

  componentWillUnmount(){
    window.clearTimeout(this.state.timerId);
  }

  render(){
    const displayResultIcon = this.displayResultIcon();
    return (
      <div className='endgame'>
        {displayResultIcon}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    audio: state.audio,
    game: state.game
  };
}

export default connect(mapStateToProps)(Endgame)