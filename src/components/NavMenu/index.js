import { Dropdown, Menu, message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { bindActionCreators, combineReducers } from 'redux'
import { signOut } from '../../service/auth'
import { getCityByIp } from '../../service/homepage'
import store from '../../Store'
import { setCityId, setCityName, setCountryId, setUser } from './actions'
import { positionReducer, userReducer } from './reducer'
import './static/style/index.less'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const userLinkStyle = {
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
  isPartyB: state.user.isPartyB,
  avatar: state.user.avatar,
  user: state.user,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setCityName,
  setCityId,
  setCountryId,
  setUser,
}, dispatch)

@connect(mapState, mapDispatch)
class NavMenu extends Component {
  handleSignOut = async () => {
    const { data: { code, desc } } = await signOut()
    if (code !== 200) {
      message.error('退出登录失败')
      return
    }
    this.props.setUser({})
    browserHistory.push('/auth/login')
  }

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
              ? (
                <div className="li-wrapper">
                  { !this.props.user.isPartyB
                  && <li className="li-item user-li-item">
                    <Link to="/skill" style={ specialLinkStyle }>我要工作</Link>
                  </li>
                  }
                  <li className="li-item user-li-item">
                    <Link to="/" style={ userLinkStyle }>我的订单</Link>
                  </li>
                  <li className="li-item user-li-item">
                    <Link to="/" style={ userLinkStyle }>消息中心</Link>
                  </li>
                  <li className="li-item user-li-item">
                    <Dropdown overlay={
                      <Menu>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/profile">我的主页</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/wallet">钱包</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/editData">设置</Link>
                        </Menu.Item>
                        <Menu.Item className="nav-ant-menu-item">
                          <Link to="/" onClick={ this.handleSignOut }>退出登录</Link>
                        </Menu.Item>
                      </Menu>
                    }>
                      <img src={ this.props.avatar } alt="头像" width={ 30 } height={ 30 } className="avatar"/>
                    </Dropdown>
                  </li>
                </div>
              )
              : <div className="li-wrapper">
                <li style={ { paddingRight: '20px' } } className="li-item">帮助</li>
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
