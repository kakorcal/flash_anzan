import React, {Component} from 'react'
import {connect} from 'react-redux'

class Play extends Component{
  constructor(props){
    super(props);
    this.state = {
      timerId: null,
      delayId: null,
      currentNumber: null,
      currentSum: 0,
      count: this.props.levels.currentLevel.numbers
    };
  }

  changeView(view){
    var delayId = window.setTimeout(() => {
      this.props.changeView(view);
    }, 1000);

    this.setState({delayId});
  }

  generateRandomNumber(digit){
    var num = null;
    var min = null;
    var max = null;
    var rand = Math.random();

    switch(digit){
      case 1:
        min = 1;
        max = 9; break;
      case 2:
        min = 10;
        max = 99; break;
      case 3:
        min = 100;
        max = 999; break;
      default: break;
    }
    
    switch(rand){
      case 0:
        num = min; break;
      case 1:
        num = max; break;
      default:
        num = Math.floor(rand * (max - min)) + min;
    }

    if(num !== this.state.currentNumber){
      console.log('NUMBER: ', num);
      return num;
    }else{
      console.log('DUPLICATE: ', num);
      return this.generateRandomNumber(digit);
    }
  }

  startGame(){
    var {currentLevel} = this.props.levels;
    var interval = Math.ceil(currentLevel.seconds / currentLevel.numbers);

    var timerId = window.setInterval(() => {
      var count = this.state.count - 1;
      if(!~count) {
        this.changeView('judge');
      }else{
        if(this.props.audio.volume) this.props.audio.blip.play();
        var currentNumber = this.generateRandomNumber(currentLevel.digits);
        var currentSum = this.state.currentSum + currentNumber;
        this.setState({currentNumber, currentSum, count});
      }
    }, interval);
    this.setState({timerId});
  }
  
  componentWillMount(){
    console.log('START GAME');
    this.startGame();
  }

  componentWillUnmount(){
    window.clearInterval(this.state.timerId);
    window.clearTimeout(this.state.delayId);
  }

  render(){
    const {currentNumber} = this.state;
    const numberDisplay = !this.state.delayId ? {display: 'block'} : {display: 'none'};
    return (
      <div className='play'>
        <span style={numberDisplay}>{currentNumber}</span>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    levels: state.levels,
    audio: state.audio
  }
}

export default connect(mapStateToProps)(Play)