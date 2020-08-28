import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from './promiseMiddleware';
import rootReducer from '../reducer';

export default function configureStore(initialState) {
  let isDebuggingInChrome = process.env.NODE_ENV === 'development' && !!window.navigator.userAgent;
  let middleware = [thunk, promiseMiddleware];
  if(isDebuggingInChrome){
    middleware.push(createLogger)
  }
  let finalCreateStore = compose(applyMiddleware(...middleware))(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
