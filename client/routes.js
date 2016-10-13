import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import About from './components/About'
import Pregame from './components/Pregame'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/about' component={About}/>
    <Route path='/start' component={Pregame}/>
  </Route>
);