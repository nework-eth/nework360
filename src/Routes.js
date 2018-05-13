import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'

import { syncHistoryWithStore } from 'react-router-redux'

import App from './pages/App.js'
import store from './Store.js'

const createElement = (Component, props) => {
  return (
    <Provider store={ store }>
      <Component { ...props } />
    </Provider>
  )
}

const getHomePage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Home" */'./pages/Home.js')).default,
)

const getAboutPage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "About" */'./pages/About.js')).default,
)

const getCounterPage = async (nextState, callback) => {
  const { page, reducer, stateKey, initialState } = await import(/* webpackChunkName: "CounterPage" */'./pages/CounterPage.js')
  const state = store.getState()
  store.reset(combineReducers({
    ...store._reducers,
    counter: reducer,
  }), {
    ...state,
    [ stateKey ]: initialState,
  })
  callback(null, page)
}

const getNotFoundPage = async (nextState, callback) => callback(null, (await ('./pages/NotFound')).default)

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Router history={ history } createElement={ createElement }>
    <Route path="/" component={ App }>
      <IndexRoute getComponent={ getHomePage }/>
      <Route path="home" getComponent={ getHomePage }/>
      <Route path="counter" getComponent={ getCounterPage }/>
      <Route path="about" getComponent={ getAboutPage }/>
      <Route path="*" getComponent={ getNotFoundPage }/>
    </Route>
  </Router>
)

export default Routes
