import React, {Component} from 'react'

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

  componentWillMount(){
    this.startTimer();
  }

  startTimer(){
    var timerId = window.setInterval(() => {
      var count = this.state.count - 1;
      if(!~count) this.changeView('play');
      else this.setState({count});
    }, 1000);
    this.setState({timerId});
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

export default Countdown