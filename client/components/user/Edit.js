import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import requireAuth from '../../utils/requireAuth'
import {setCurrentUser, getCurrentUser} from '../../redux/actions/auth'
import {addFlashMessage} from '../../redux/actions/flashMessages'
import TextFieldGroup from '../auth/partials/common/TextFieldGroup'

class Edit extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      newUsername: '',
      newThumbnail: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  callFlashMessage(){
    this.props.addFlashMessage({
      type: 'error',
      text: 'Failed to load profile information. Please try at another time.'
    });    
  }

  onChange(e){

  }

  onSubmit(e){
    e.preventDefault();
  }


  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.getCurrentUser(this.props.auth.user._id)
        .then(({data}) => {
          if(!data) this.callFlashMessage();
          // console.log('DATA', data);
          this.setState(data);
        })
        .catch(err => {
          this.callFlashMessage();
        });
    }
  }

  render(){
    return (
      <div className='edit'>
        <h1>Profile - Edit</h1>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <div className='flash-btn-group'>
            <input type="submit" 
              disabled={this.state.isLoading} 
              className='btn btn-lg flash-btn flash-bg-blue flash-co-cream' 
              value='EDIT'
            />

            <Link to='/user'>
              <button className='btn btn-lg flash-btn flash-bg-red flash-co-cream'>
                BACK
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Edit.propTypes = {
  setCurrentUser: React.PropTypes.func.isRequired,
  getCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default requireAuth(
  connect(mapStateToProps, {setCurrentUser, getCurrentUser, addFlashMessage})(Edit)
)