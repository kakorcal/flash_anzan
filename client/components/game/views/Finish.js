import React, {Component} from 'react'
import levels from '../../../config/levels'
import {connect} from 'react-redux'
import {updateCurrentLevel} from '../../../redux/actions/levels'

class Finish extends Component{  
  constructor(props){
    super(props);
    this.state = {
      currentLevel: this.props.levels.currentLevel,
      currentIdx: this.props.levels.currentIdx
    };
  }

  changeView(view){
    this.props.changeView(view);
  }

  handleLevelChange(change){
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
    return {currentLevel, currentIdx};
  }

  handleClick(action, e){
    switch(action){
      case 'again':
        this.changeView('countdown'); break;
      case 'next':
        this.handleLevelChange('inc');
        var newLevel = this.handleLevelChange('inc');
        this.props.updateCurrentLevel(newLevel);
        this.changeView('countdown'); break;
      case 'prev':     
        var newLevel = this.handleLevelChange('dec');
        this.props.updateCurrentLevel(newLevel);
        this.changeView('countdown'); break;
      case 'quit':
        this.changeView('pregame'); break;
      default: 
        this.changeView('pregame'); break;
    }
  }

  adjustUserInput(input){
    if(isNaN(input) || typeof input !== 'number') return 'Invalid Input';
    return input;
  }

  componentWillMount(){
    // log the result to db if they are authenticated
    if(this.props.auth.isAuthenticated){
      
    }
  }

  render(){
    const playerAnswer = this.adjustUserInput(this.props.game.playerAnswer);
    return (
      <div className='finish'>
        <div className='game-results'>
          <h2>Result: {this.props.game.result.toUpperCase()}</h2>
          <h3>Your Answer: {playerAnswer}</h3>
          <h3>Correct Answer: {this.props.game.currentSum}</h3>
        </div>
        <div className='flash-btn-group'>
          <button className='btn btn-lg flash-btn flash-bg-blue flash-co-cream'
            onClick={this.handleClick.bind(this, 'again')}
          >PLAY AGAIN</button>
          <button className='btn btn-lg flash-btn flash-bg-red flash-co-cream'
            onClick={this.handleClick.bind(this, 'next')}
          >NEXT LEVEL</button>
          <button className='btn btn-lg flash-btn flash-bg-orange flash-co-cream'
            onClick={this.handleClick.bind(this, 'prev')}
          >PREV LEVEL</button>
          <button className='btn btn-lg flash-btn flash-bg-green flash-co-cream'
            onClick={this.handleClick.bind(this, 'quit')}
          >QUIT GAME</button>
        </div>
      </div>
    );
  }
}

Finish.propTypes = {
  updateCurrentLevel: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    levels: state.levels,
    game: state.game,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {updateCurrentLevel})(Finish)