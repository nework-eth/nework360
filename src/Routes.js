import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'

import { syncHistoryWithStore } from 'react-router-redux'

import { page as AuthPage } from './pages/Auth/Auth'
import { page as Homepage } from './pages/Homepage/Homepage'

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

const getNotFoundPage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "NotFound" */'./pages/NotFound.js')).default,
)

const getLoginPage = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "Login" */'./pages/Auth/Login.js')).page,
  )
}

const getRegisterPage = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "Register" */'./pages/Auth/Register.js')).page,
  )
}

const getForgetPassword = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "Register" */'./pages/Auth/ForgetPassword.js')).page,
  )
}

const getSearchPage = async (nextState, callback) => {
  const { page, reducer, stateKey, initialState } = (await import(/* webpackChunkName: "Search" */'./pages/Homepage/SearchPage.js'))
  const state = store.getState()
  store.reset(combineReducers({
    ...store._reducers,
    city: reducer,
  }), {
    ...state,
    [ stateKey ]: initialState,
  })
  callback(null, page)
}

const getFirstClassPage = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "FirstClass" */'./pages/Homepage/FirstClass.js')).view,
  )
}

const getSelectCityPage = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "SelectCity" */'./pages/SelectCity/SelectCity.js')).view,
  )
}

const getHome = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "Home" */'./pages/Homepage/Home.js')).view,
  )
}

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Router history={ history } createElement={ createElement }>
    <Route path="/auth" component={ AuthPage }>
      <IndexRoute getComponent={ getHomePage }/>
      <Route path="home" getComponent={ getHomePage }/>
      <Route path="counter" getComponent={ getCounterPage }/>
      <Route path="about" getComponent={ getAboutPage }/>
      <Route path="login" getComponent={ getLoginPage }/>
      <Route path="register" getComponent={ getRegisterPage }/>
      <Route path="forget-password" getComponent={ getForgetPassword }/>
      <Route path="*" getComponent={ getNotFoundPage }/>
    </Route>
    <Route path="/" component={ Homepage }>
      <IndexRoute getComponent={ getSearchPage }/>
      <Route path="select-city" getComponent={ getSelectCityPage }/>
      <Route path="search" getComponent={ getSearchPage }/>
    </Route>
  </Router>
)

export default Routes
