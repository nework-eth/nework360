import cookie from 'cookie'
import React from 'react'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as ActionTypes from './components/NavMenu/actionTypes'

import { page as AuthPage } from './pages/Auth/Auth'
import { page as Container } from './pages/Container/Container'
import { page as Homepage } from './pages/Homepage/Homepage'

import { getUserById } from './service/editData'

import store from './Store'

const createElement = (Component, props) => {
  return (
    <Provider store={ store }>
      <Component { ...props } />
    </Provider>
  )
}

const getCounterPage = async (nextState, callback) => {
  const {page, reducer, stateKey, initialState} = await import(/* webpackChunkName: "CounterPage" */'./pages/CounterPage.js')
  const state = store.getState()
  store.reset(combineReducers({
    ...store._reducers,
    counter: reducer,
  }), {
    ...state,
    [stateKey]: initialState,
  })
  callback(null, page)
}

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

const getForgetPassword = async (nextState, callback) =>
  callback(
    null,
    (await import(/* webpackChunkName: "Register" */'./pages/Auth/ForgetPassword.js')).page,
  )

const getSearchPage = async (nextState, callback) =>
  callback(null, (await import(/* webpackChunkName: "Search" */'./pages/Homepage/SearchPage.js')).page)

const getServiceList = async (nextState, callback) =>
  callback(null, (await import(/* webpackChunkName: "Search" */'./pages/Homepage/ServiceList.js')).page)

const getSelectCityPage = async (nextState, callback) => {
  callback(
    null,
    (await import(/* webpackChunkName: "SelectCity" */'./pages/SelectCity/SelectCity.js')).view,
  )
}
//
// const getHome = async (nextState, callback) => {
//   callback(
//     null,
//     (await import(/* webpackChunkName: "Home" */'./pages/Homepage/Home.js')).view,
//   )
// }
//
// const getTest = async (nextState, callback) => {
//   callback(
//     null,
//     (await import(/* webpackChunkName: "Test" */'./components/Test/test.js')).view,
//   )
// }

// const getSkillPage = async (nextState, callback) => callback(null, (await import(/* webpackChunkName: "Skill"
// */'./pages/Skill/Skill.js')).page)

const getSkillPage = async (nextState, callback) =>
  callback(null, (await import(/* webpackChunkName: "Skill" */'./pages/Skill/Skill.js')).page)

const getProfilePage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Profile" */'./pages/Profile/Profile.js')).page,
)

const getEditDataPage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "UserDetail" */'./pages/EditData/EditData.js')).page,
)

const getWalletPage = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Wallet" */'./pages/Wallet/Wallet.js')).page,
)

const getRequirement = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Requirement" */'./pages/Requirement/RequirementHomepage.js')).page,
)

const getPostDemand = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "PostDemand" */'./pages/PostDemand/PostDemand.js')).page,
)

const getList = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "List" */'./pages/List/List.js')).page,
)

const getNeedOrderDetail = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "NeedOrderDetail" */'./pages/NeedOrderDetail/NeedOrderDetail.js')).page,
)

const getNeedDetail = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "NeedDetail" */'./pages/NeedDetail/NeedDetail.js')).page,
)

const getClueCard = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "ClueCard" */'./pages/ClueCard/ClueCard.js')).page,
)

const getPay = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Pay" */'./pages/Pay/Pay.js')).page,
)

const getWithdraw = async (nextState, callback) => callback(
  null,
  (await import(/* webpackChunkName: "Withdraw" */'./pages/Withdraw/Withdraw.js')).page,
)

const history = syncHistoryWithStore(browserHistory, store)

const requireAuth = async (nextState, replaceState, callback) => {
  if ((store.getState()).user.userId) {
    callback()
    return
  }
  const userId = (cookie.parse(document.cookie)).userId
  if (userId) {
    const {data: {data, code}} = await getUserById({userId})
    if (code === 200) {
      store.dispatch({type: ActionTypes.SETUSER, user: data})
      store.dispatch({type: ActionTypes.SETUSERID, userId: data.userId})
      callback()
      return
    }
  }
  replaceState('/login')
  callback()
}

const autoLogin = async (nextState, replaceState, callback) => {
  if ((store.getState()).user.userId) {
    callback()
    return
  }
  const userId = (cookie.parse(document.cookie)).userId
  if (userId) {
    const {data: {data, code}} = await getUserById({userId})
    if (code === 200) {
      store.dispatch({type: ActionTypes.SETUSER, user: data})
      store.dispatch({type: ActionTypes.SETUSERID, userId: data.userId})
    }
  }
  callback()
}

const Routes = () => (
  <Router history={ history } createElement={ createElement }>
    <Route component={ AuthPage }>
      <Route path="counter" getComponent={ getCounterPage }/>
      <Route path="/login" getComponent={ getLoginPage }/>
      <Route path="/register" getComponent={ getRegisterPage }/>
      <Route path="/forget-password" getComponent={ getForgetPassword }/>
    </Route>
    <Route path="/" component={ Homepage } onEnter={ autoLogin }>
      <IndexRoute getComponent={ getSearchPage }/>
      <Route path="select-city" getComponent={ getSelectCityPage }/>
      <Route path="search" getComponent={ getSearchPage }/>
      <Route path="service-list" getComponent={ getServiceList }/>
    </Route>
    <Route component={ Container } onEnter={ requireAuth }>
      <Route path="/skill" getComponent={ getSkillPage }/>
      <Route path="/profile" getComponent={ getProfilePage }/>
      <Route path="/editData" getComponent={ getEditDataPage }/>
      <Route path="/wallet" getComponent={ getWalletPage }/>
      <Route path="/requirement-homepage" getComponent={ getRequirement }/>
      <Route path="/post-demand" getComponent={ getPostDemand }/>
      <Route path="/list" getComponent={ getList }/>
      <Route path="/need-order-detail" getComponent={ getNeedOrderDetail }/>
      <Route path="/need-detail" getComponent={ getNeedDetail }/>
      <Route path="/clue-card" getComponent={ getClueCard }/>
      <Route path="/pay" getComponent={ getPay }/>
      <Route path="/withdraw" getComponent={ getWithdraw }/>
    </Route>
  </Router>
)

export default Routes
