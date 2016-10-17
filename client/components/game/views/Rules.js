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
      <div>
        <button 
          className='btn flash-btn flash-bg-blue flash-co-yellow'
          onClick={this.changeView.bind(this, 'pregame')}
        >BACK</button>
      </div>
    );
  }
}

export default Rules