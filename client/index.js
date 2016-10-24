import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {Howl} from 'howler'
import store from './redux/store'
import routes from './routes'
import {setSoundFX} from './redux/actions/audio'
import './styles/base.scss'
import blip from './audio/blip_sound_fx.wav'
import correct from './audio/correct_sound_fx.wav'
import wrong from './audio/wrong_sound_fx.wav'
import setAuthorizationToken from './utils/setAuthorizationToken'
import {setCurrentUser} from './redux/actions/auth'
import jwt from 'jsonwebtoken'

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

createHowlers([
  {name: 'blip', fx: blip}, 
  {name: 'correct', fx: correct}, 
  {name: 'wrong', fx: wrong}
]);

function createHowlers(arr){
  var count = 0;
  var howlers = arr.map(sound => {
    var howler = new Howl({src: [sound.fx]});
    howler.name = sound.name;
    howler.once('load', checkSoundCount.bind(null, howler));
    return howler;
  });
  
  function checkSoundCount(howler){
    if(arr.length - 1 === count){
      console.log('SOUND READY');
      store.dispatch(setSoundFX(howlers));
      initializeReact();
    }
    count++;
  }  
}

function initializeReact(){
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
  );
}