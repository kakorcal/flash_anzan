import React, {Component} from 'react'
import {connect} from 'react-redux'
import {evaluateResult} from '../../../redux/actions/game'

class Judge extends Component{
  constructor(props){
    super(props);
    this.state = {
      answer: '',
      delayId: null
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeView(view){
    var delayId = window.setTimeout(() => {
      console.log('EVALUATE');
      this.props.changeView(view);
    }, 100);

    this.setState({delayId});
  }

  handleChange(e){
    this.setState({answer: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('ANSWER SUBMIT');
    if(+this.state.answer === this.props.game.currentSum){
      this.props.evaluateResult('win', +this.state.answer);
    }else{
      this.props.evaluateResult('lose', +this.state.answer);
    }
    this.changeView('endgame');
  }

  render(){
    return (
      <div className='judge'>
        <form className='flash-form-group' onSubmit={this.handleSubmit}>
          <div>
            <input type="text" 
              autoFocus='true' 
              placeholder='ANSWER'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type='submit' 
              className='btn btn-lg flash-btn flash-bg-blue flash-co-cream'
            >SUBMIT</button>
          </div>
        </form>
      </div>
    );
  }
}

Judge.propTypes = {
  evaluateResult: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    game: state.game
  }
}

export default connect(mapStateToProps, {evaluateResult})(Judge)