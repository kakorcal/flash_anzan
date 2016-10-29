import React, {Component} from 'react'

class About extends Component{
  constructor(props){
    super(props);
  }

  changeView(view, e){
    this.props.changeView(view);
  }

  render(){
    return (
      <div className='about'>
        <div className='description'>
          <p>Flash Anzan is a mental arithmetic application where players can train their memory by calculating the sum of numbers that flash on the screen. This game was originally created by a Japanese teacher as an alternative for using the <a href="https://en.wikipedia.org/wiki/Soroban" target='_blank'>soroban</a>.</p>
          <p>Here are several sources for more information:</p>
          <ul>
            <li><a href="https://en.wikipedia.org/wiki/Mental_abacus" target='_blank'>Wikipedia article</a></li>
            <li><a href="https://www.theguardian.com/science/alexs-adventures-in-numberland/2012/oct/29/mathematics" target='_blank'>Article about flash anzan and soroban</a></li>
            <li><a href="https://www.tofugu.com/japan/japanese-math/" target='_blank'>More in depth about flash anzan and Japanese education</a></li>
          </ul>
        </div>
        <div className='flash-btn-group'>
          <button 
            className='btn btn-lg flash-btn flash-bg-blue flash-co-cream'
            onClick={this.changeView.bind(this, 'pregame')}
          >BACK</button>
        </div>        
      </div>
    );
  }
}

export default About