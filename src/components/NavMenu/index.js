import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './static/style/index.less'
import { combineReducers } from 'redux'
import * as actions from './actions'
import reducer from './reducer'
import store from '../../Store'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const stateKey = 'city'

const initialState = '北京'

const state = store.getState()
store.reset(combineReducers({
  ...store._reducers,
  [ stateKey ]: reducer,
}), {
  ...state,
  [ stateKey ]: initialState,
})

const mapState = (state) => ({
  city: state[ stateKey ] || '北京',
})

@connect(mapState)
class NavMenu extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { city } = this.props
    return (
      <div className="top-nav-container">
        <ul>
          <div className="li-wrapper">
            <li className="li-item">
              <Link to="/" style={{color:'#092235'}}>
                <i className="iconfont icon-logo logo-item"/>
              </Link>
            </li>
            <li className="vertical-line"/>
            <Link className="li-item" style={ { paddingRight: '10px', textDecoration: 'none', color: '#092235' } }
              to="/select-city">{ city }</Link>
          </div>
          <div className="li-wrapper">
            <li style={ { paddingRight: '20px' } } className="li-item">如何运作？</li>
            <li className="vertical-line"/>
            <li className="li-item"><Link to="/auth/login" style={ specialLinkStyle }>登录</Link></li>
            <li
              className="li-item" style={ { paddingLeft: '0' } }><Link to="/auth/register"
              style={ specialLinkStyle }>注册</Link>
            </li>
          </div>
        </ul>
      </div>
    )
  }
}

export { NavMenu as view, stateKey, actions, reducer, initialState }
