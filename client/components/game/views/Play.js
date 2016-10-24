import React, {Component} from 'react'
import {connect} from 'react-redux'

class Play extends Component{
  constructor(props){
    super(props);
    this.state = {
      timerId: null,
      currentSum: 0,
      currentNumber: 8,
      levels: this.props.levels
    };
  }

  changeView(view){
    this.props.changeView(view);
  }

  generateRandomNumber(digit){
    var num = null;
    switch(digit){
      case 1:
        num = Math.floor(Math.random()*10); break;
      case 2:
        num = Math.floor(Math.random()*100); break;
      case 3:
        num = Math.floor(Math.random()*1000); break;
      default: return num;
    }
    return num;
  }

  startGame(){
    var timerId = window.setInterval(() => {
      var number = generateRandomNumber();
      if(!~count) this.changeView('play');
      else this.setState({count});
    }, 1000);
    this.setState({timerId});
  }
  
  componentWillMount(){
    // this.startGame();
  }

  componentWillUnmount(){
    window.clearInterval(this.state.timerId);
  }

  render(){
    const {currentNumber} = this.state;
    return (
      <div className='play'>
        <span>{currentNumber}</span>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    levels: state.levels
  }
}

export default connect(mapStateToProps)(Play)