import React, {Component} from 'react'

class Pregame extends Component{
  constructor(props){
    super(props);
    this.state = {
      level: 1
    };
  }

  changeView(view, e){
    this.props.changeView(view);
  }

  render(){
    return (
      <div>
        <div>
          <h1>
            Choose Level: {this.state.level}
            <button>
              <i className='fa fa-caret-up'></i>
            </button>
            <button>
              <i className='fa fa-caret-down'></i>
              </button>
          </h1>
        </div>
        <div>
          
        </div>
        <div className='flash-btn-group'>
          <button 
            className='btn flash-btn flash-bg-blue flash-co-cream'
            onClick={this.changeView.bind(this, 'countdown')}
          >START</button> 
          <button 
            className='btn flash-btn flash-bg-red flash-co-cream'
            onClick={this.changeView.bind(this, 'rules')}
          >RULES</button>               
        </div>
      </div>
    );
  }
}

export default Pregame