import React, {Component} from 'react'
import {connect} from 'react-redux'

class Countdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: 3,
      timerId: null
    };
  }

  changeView(view){
    this.props.changeView(view);
  }

  createCircles(){
    const circles = [];
    for(var i = this.state.count; i >= 1; i--){
      circles.push(
        <i key={i} className='fa fa-circle fa-3x flash-co-yellow'></i>
      );
    }
    return (<div className='circles'>{circles}</div>);
  }

  startTimer(){
    var timerId = window.setInterval(() => {
      var count = this.state.count - 1;
      if(!~count) {
        this.changeView('play');
      }else { 
        if(this.props.audio.volume) this.props.audio.blip.play();
        this.setState({count});
      }
    }, 800);
    this.setState({timerId});
  }

  componentWillMount(){
    console.log('START TIMER');
    this.startTimer();
  }

  componentWillUnmount(){
    window.clearInterval(this.state.timerId);
  }

  render(){
    const circleWrapper = this.createCircles();
    return (
      <div className='countdown'>
        {circleWrapper}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    audio: state.audio
  };
}

export default connect(mapStateToProps)(Countdown)

