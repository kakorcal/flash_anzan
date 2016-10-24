import React, {Component} from 'react'
import {connect} from 'react-redux'
import blip from '../../../audio/blip_sound_fx.wav'
import correct from '../../../audio/correct_sound_fx.mp3'
import wrong from '../../../audio/wrong_sound_fx.mp3'
import {loadAudio, setTotalAudioCount} from '../../../redux/actions/audio'

class SoundFx extends Component{
  constructor(props){
    super(props);
    this.loadAudio = this.loadAudio.bind(this);
  }

  componentDidMount(){
    this.props.setTotalAudioCount(document.getElementsByTagName('audio').length);
  }
    
  loadAudio(soundfx){
    console.log('SOUND READY: ', soundfx);
    this.props.loadAudio();
  }

  render(){
    return (

    );
  }
}

SoundFx.propTypes = {
  loadAudio: React.PropTypes.func.isRequired,
  setTotalAudioCount: React.PropTypes.func.isRequired
};

export default connect(null, {loadAudio, setTotalAudioCount})(SoundFx)






