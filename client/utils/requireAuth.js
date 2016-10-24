import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {addFlashMessage} from '../actions/flashMessages'

export default function(ComposedComponent) {
  class Authenticate extends Component{
    componentWillMount(){
      if(!this.props.isAuthenticated){
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        });
        browserHistory.push('/login');
      }
    }

    componentWillUpdate(nextProps){
      // redirect after logging out
      if(!nextProps.isAuthenticated){
        browserHistory.push('/');
      }
    }

    render(){
      return (
        <ComposedComponent {...this.props}/>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps, {addFlashMessage})(Authenticate);
}