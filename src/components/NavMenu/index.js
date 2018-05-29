import { message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators, combineReducers } from 'redux'
import { getCityByIp } from '../../service/homepage'
import store from '../../Store'
import { setCityId, setCityName, setCountryId } from './actions'
import { positionReducer, userReducer } from './reducer'
import './static/style/index.less'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const stateKey = 'position'

const initialState = {
  cityName: '北京',
  cityId: 110,
  countryId: 1,
}

const state = store.getState()
store.reset(combineReducers({
  ...store._reducers,
  [ stateKey ]: positionReducer,
  user: userReducer,
}), {
  ...state,
  [ stateKey ]: initialState,
  user: {
    userId: '',
  },
})

const mapState = (state) => ({
  cityName: state[ stateKey ].cityName,
  userId: state.user.userId,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setCityName,
  setCityId,
  setCountryId,
}, dispatch)

@connect(mapState, mapDispatch)
class NavMenu extends Component {
  render () {
    const { cityName } = this.props
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
              to="/select-city">{ cityName }</Link>
          </div>
          {
            this.props.userId
              ? <div className="li-wrapper">
                <li className="li-item">
                  <Link to="/skill" style={ specialLinkStyle }>我要工作</Link>
                </li>
              </div>
              : <div className="li-wrapper">
                <li style={ { paddingRight: '20px' } } className="li-item">如何运作？</li>
                <li className="vertical-line"/>
                <li className="li-item"><Link to="/auth/login" style={ specialLinkStyle }>登录</Link></li>
                <li
                  className="li-item" style={ { paddingLeft: '0' } }>
                  <Link to="/auth/register" style={ specialLinkStyle }>注册</Link>
                </li>
              </div>
          }
        </ul>
      </div>
    )
  }

  getCityByIp = async () => {
    try {
      const { data: { code, desc } } = await getCityByIp()
      if (code === 200) {
        this.props.setCityName(desc)
      }
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  componentDidMount () {
    this.getCityByIp()
  }
}

export { NavMenu as view, stateKey, initialState }
