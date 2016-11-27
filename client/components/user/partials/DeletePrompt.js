import React, {Component} from 'react'

class DeletePrompt extends Component{
  handleDeleteUser(e){
    this.props.handleDeleteUser();
  }

  handleDeleteCancel(e){
    this.props.handleDeleteCancel();
  }

  componentWillMount(){
    let body = document.getElementsByTagName('body')[0];
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
  }

  componentWillUnmount(){
    let body = document.getElementsByTagName('body')[0];
    let overlay = document.getElementsByClassName('overlay')[0];
    body.removeChild(overlay);
  }

  render(){
    return (
      <div className="delete-prompt">
        <h3 className='text-center'>Are You Sure?</h3>
        <div className="flash-btn-group">
          <button className="btn flash-btn flash-bg-red flash-co-cream" onClick={this.handleDeleteUser.bind(this)}>DELETE</button>
          <button className="btn flash-btn flash-bg-green flash-co-cream" onClick={this.handleDeleteCancel.bind(this)}>CANCEL</button>
        </div>
      </div>
    );
  }
}

export default DeletePrompt