import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'
import validator from 'validator'
import {isEmpty} from 'lodash'
import requireAuth from '../../utils/requireAuth'
import {setCurrentUser, getCurrentUser, editCurrentUser} from '../../redux/actions/auth'
import {addFlashMessage} from '../../redux/actions/flashMessages'
import TextFieldGroup from '../auth/partials/common/TextFieldGroup'

class Edit extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      thumbnail_url: '',
      initialProfile: {
        username: this.props.auth.user.username,
        thumbnail_url: ''
      },
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    if(e.target.name === 'thumbnail_url'){
      this.setState({[e.target.name]: e.target.files[0].name});
    }else{
      this.setState({[e.target.name]: e.target.value});
    }
  }

  onSubmit(e){
    e.preventDefault();
    const {username, thumbnail_url, errors} = this.state;
    this.setState({isLoading: true});
      
    // case 1: initial profile 
    // if(validator.isEmpty(username)) errors.username = '';

    this.props.editCurrentUser(this.props.auth.user._id, {
      user: {username, thumbnail_url}
    })
      .then(() => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Your profile has been updated.'
        });

        browserHistory.push('/user');
      })
      .catch(err => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Server is down. Please try at another time.'
        });
      });
  }

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.getCurrentUser(this.props.auth.user._id)
        .then(({data}) => {
          if(!data) {
            this.props.addFlashMessage({
              type: 'error',
              text: 'Failed to load profile information. Please try at another time.'
            });              
          }else{
            const {thumbnail_url} = data;
            this.setState({thumbnail_url});
          }
        })
        .catch(err => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Failed to load profile information. Please try at another time.'
          });  
        });
    }
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.username).select();     
  }

  render(){
    const {errors} = this.state;
    return (
      <div className='edit'>
        <h1>Profile - Edit</h1>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor='username' className='control-label'>Username:</label>
            <input className='form-control' ref='username'
              type='text' 
              id='username' 
              name='username' 
              value={this.state.username}
              onChange={this.onChange} />
            {errors.username && <span className='help-block' style={{color:'red'}}>*{errors.username}</span>}
          </div>
          <div className='form-group file-group'>
            <p className='control-label'>Thumbnail:</p>
            <div>
              <label className='btn btn-lg flash-btn flash-bg-orange flash-co-cream'>
                Upload 
                <input 
                  type="file" 
                  id='thumbnail_url' 
                  name='thumbnail_url' 
                  accept='image/*'
                  style={{display: 'none'}}
                  onChange={this.onChange} />
              </label>
              <span>{this.state.thumbnail_url}</span>              
            </div>
            {errors.thumbnail_url && <span className='help-block' style={{color:'red'}}>*{errors.thumbnail_url}</span>}
          </div> 
          <div className='flash-btn-group'>
            <input type="submit" 
              disabled={this.state.isLoading} 
              className='btn btn-lg flash-btn flash-bg-green flash-co-cream' 
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
  editCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default requireAuth(
  connect(mapStateToProps, {setCurrentUser, getCurrentUser, addFlashMessage, editCurrentUser})(Edit)
)