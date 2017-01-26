import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import Main from './components/game/Main'
import Show from './components/user/Show'
// import Edit from './components/user/Edit'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NotFound from './components/NotFound'
/* TODO: Enable edit feature
  <Route path='/user/edit' component={Edit}/>
 */

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Main}/>
    <Route path='/user' component={Show}/>
    <Route path='/auth/login' component={Login}/>
    <Route path='/auth/signup' component={Signup}/>
    <Route path='*' component={NotFound} />
  </Route>
);