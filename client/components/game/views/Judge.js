import React, {Component} from 'react'
import {connect} from 'react-redux'

class Judge extends Component{
  constructor(props){
    super(props);
    this.state = {
      answer: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({answer: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('ANSWER SUBMIT');
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

export default Judge