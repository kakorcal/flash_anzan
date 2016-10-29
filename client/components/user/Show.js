import React, {Component} from 'react'
import {connect} from 'react-redux'
import requireAuth from '../../utils/requireAuth'
import {setCurrentUser, getCurrentUser} from '../../redux/actions/auth'
import {addFlashMessage} from '../../redux/actions/flashMessages'

class Show extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: null,
      create_date: null,
      thumbnail_url: null,
      highest_level: null,
      win_lose_ratio: null,
      activity_log: null
    };
  }

  callFlashMessage(){
    this.props.addFlashMessage({
      type: 'error',
      text: 'Failed to load profile information. Please try at another time.'
    });    
  }

  formatDate(str){
    let d = new Date(str);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    return (++month) + '/' + day + '/' + year;
  } 

  componentWillMount(){
    this.props.getCurrentUser(this.props.user._id)
      .then(({data}) => {
        if(!data) this.callFlashMessage();
        // console.log('DATA', data);
        this.setState(data);
      })
      .catch(err => {
        this.callFlashMessage();
      });
  }

  render(){
    return (
      <div className='show'>
        <h1>Profile</h1>
        <hr/>
        <div className="row user-info">
          <div className="user-info-desc col col-xs-6">
            <img src={this.state.thumbnail_url} alt="pic"/>
            <p>Username: {this.state.username}</p>
            <p>Joined on: {this.formatDate(this.state.create_date)}</p>
          </div>
          <div className="user-info-piechart col col-xs-6">
            <p>Win Lose Ratio: {this.state.win_lose_ratio}</p>
            <p>Highest Level: {this.state.highest_level}</p>
          </div>
        </div>
        <div className="user-graph">
          <p>Activity Log</p>
        </div>
        <div className='flash-btn-group'>
          <button className='btn btn-lg flash-btn flash-bg-dark-green flash-co-cream'>EDIT</button>
          <button className='btn btn-lg flash-btn flash-bg-dark-red flash-co-cream'>DELETE</button>
        </div>     
      </div>
    );
  }
}

Show.propTypes = {
  setCurrentUser: React.PropTypes.func.isRequired,
  getCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    user: state.auth.user
  };
}

export default requireAuth(
  connect(mapStateToProps, {setCurrentUser, getCurrentUser, addFlashMessage})(Show)
)