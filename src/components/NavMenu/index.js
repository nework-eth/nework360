import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './static/style/index.less'
import { combineReducers } from 'redux'
import { bindActionCreators } from 'redux'
import { setCity } from './actions'
import reducer from './reducer'
import store from '../../Store'
import { getCityByIp } from '../../service/homepage'
import { message } from 'antd'

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

const mapDispatch = (dispatch) => bindActionCreators({
  setCity: setCity,
}, dispatch)

@connect(mapState, mapDispatch)
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
              <Link to="/" style={ { color: '#092235' } }>
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

  getCityByIp = async () => {
    try {
      const { data: { code, desc } } = await getCityByIp()
      if (code === 200) {
        this.props.setCity(desc)
        return
      }
      this.props.setCity('北京')
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  componentDidMount () {
    this.getCityByIp()
  }
}

export { NavMenu as view, stateKey, reducer, initialState }
