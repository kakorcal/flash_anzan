import React, {Component} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'

class FlashMessage extends Component{
  constructor(props){
    super(props);
    this.state = {
      delayId: null
    };

    this.onClick = this.onClick.bind(this);
  }
  
  onClick(){
    this.props.deleteFlashMessage(this.props.message.id);
  }

  componentDidMount(){
    var delayId = window.setTimeout(() => {
      if(this.props.messages.length){
        this.props.deleteFlashMessage(this.props.message.id);
      }
    }, 10000);
    this.setState({delayId});
  }

  componentWillUnmount(){
    window.clearTimeout(this.state.delayId);
  }

  render(){
    const {id, type, text} = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.onClick} className='close'><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps)(FlashMessage)