import React, {Component} from 'react'

class Rules extends Component{
  constructor(props){
    super(props);
  }

  changeView(view, e){
    this.props.changeView(view);
  }

  render(){
    return (
      <div className='flash-btn-group'>
        <button 
          className='btn flash-btn flash-bg-blue flash-co-cream'
          onClick={this.changeView.bind(this, 'pregame')}
        >BACK</button>
      </div>
    );
  }
}

export default Rules