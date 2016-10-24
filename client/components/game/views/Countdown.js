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
    return (
      <div className='circles'>
        {circles}
      </div>
    );
  }

  startTimer(){
    var timerId = window.setInterval(() => {
      var count = this.state.count - 1;
      if(!~count) {
        this.changeView('play');
      }else { 
        //***************************************************************************
          // TODO: Prevent react rerendering or find way to load audio only once
          // Solution: Add audio to server side string. Wrap ReactDOM into audio load callback
          /*
            By setting the new state of count, the entire react app rerenders. This
            means that the SoundFX component is also rerendered, so the audio files 
            have to be reloaded multiple times. Sound lag will occur if the time interval
            is smaller than 167ms due to the load time being slower.
            // document.getElementById('blip').play();
          */
        //***************************************************************************
        this.props.fx.blip.play();
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
    fx: state.audio
  };
}

export default connect(mapStateToProps)(Countdown)

