import React, {Component} from 'react'

class Pregame extends Component{
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
          className='btn flash-btn flash-bg-red flash-co-yellow'
          onClick={this.changeView.bind(this, 'rules')}
        >RULES</button>      
      </div>
    );
  }
}

export default Pregame