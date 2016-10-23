import React, {Component} from 'react'
import levels from '../../../config/levels'

class Pregame extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentLevel: levels[0],
      currentIdx: 0
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  changeView(view, e){
    this.props.changeView(view);
  }

  formatTime(ms){
    var time = (ms/1000).toString();
    if(time.length === 1) time = time + '.0';
    return time;
  }

  handleLevelChange(change, e){
    var currentLevel = Object.assign({}, this.state.currentLevel);
    var currentIdx = this.state.currentIdx;
    const length = levels.length - 1;
    if(change === 'inc'){
      currentLevel = levels[++currentIdx];
    }else{
      currentLevel = levels[--currentIdx];
    }

    if(!currentLevel){
      if(currentIdx < 0){
        currentLevel = levels[length];
        currentIdx = length;
      }else{
        currentLevel = levels[0];
        currentIdx = 0;
      }
    }
    this.setState({currentLevel, currentIdx});
  }

  handleKeyPress(e){
    if(e.keyCode === 38){
      this.handleLevelChange('inc', e);
    }

    if(e.keyCode === 40){
      this.handleLevelChange('dec', e);
    }
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render(){
    const {currentLevel} = this.state;
    return (
      <div className='pregame'>
        <div className='pregame-settings'>
          <h2 className='row'>
            <span className='col col-xs-4'>Level : </span>
            <span className='col col-xs-4'>{currentLevel.level}</span>
            <span className='col col-xs-4'>
              <button className='btn flash-btn flash-bg-orange flash-co-yellow'
                onClick={this.handleLevelChange.bind(this, 'inc')}>
                <i className='fa fa-caret-up'></i>
              </button>
              <button className='btn flash-btn flash-bg-orange flash-co-yellow'
                onClick={this.handleLevelChange.bind(this, 'dec')}>
                <i className='fa fa-caret-down'></i>
              </button> 
            </span>
          </h2>
          <h3 className='row'>
            <span className='col col-xs-6'>Digits : </span>
            <span className='col col-xs-6'>{currentLevel.digits}</span>
          </h3>
          <h3 className='row'>
            <span className='col col-xs-6'>Numbers : </span>
            <span className='col col-xs-6'>{currentLevel.numbers}</span>
          </h3>
          <h3 className='row'>
            <span className='col col-xs-6'>Seconds : </span>
            <span className='col col-xs-6'>{this.formatTime(currentLevel.seconds)}</span>
          </h3>
        </div>
        <div className='flash-btn-group'>
          <button 
            className='btn btn-lg flash-btn flash-bg-blue flash-co-cream'
            onClick={this.changeView.bind(this, 'countdown')}
          >START</button> 
          <button 
            className='btn btn-lg flash-btn flash-bg-red flash-co-cream'
            onClick={this.changeView.bind(this, 'rules')}
          >RULES</button>               
        </div>
      </div>
    );
  }
}

export default Pregame