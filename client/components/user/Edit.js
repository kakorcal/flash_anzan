import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

class Edit extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render(){
    //***************************************************************************
      // TODO: SWAP BUTTON AND LINK POSITIONS FOR ALL INSTANCES
    //***************************************************************************
    return (
      <div className='edit'>
        <h1>Profile - Edit</h1>
        <hr/>
        <form>
          <div className='flash-btn-group'>
            <input type="submit" 
              disabled={this.state.isLoading} 
              className='btn btn-lg flash-btn flash-bg-blue flash-co-cream' 
              value='EDIT'
            />
            <button className='btn btn-lg flash-btn flash-bg-red'>
              <Link to='/user' className='nav-link flash-co-cream'>BACK</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Edit)