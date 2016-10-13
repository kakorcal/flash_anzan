import {createStore, applyMiddleware, compose} from 'redux'
import promise from 'redux-promise';
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(promise, logger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store