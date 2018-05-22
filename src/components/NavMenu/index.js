import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './static/style/index.less'
import { stateKey } from '../../pages/Homepage/SearchPage'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const NavMenu = ({ city }) => {
  return (
    <div className="top-nav-container">
      <ul>
        <div className="li-wrapper">
          <li className="li-item"><i className="iconfont icon-logo logo-item"/></li>
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

const mapState = (state) => ({
  city: state[ stateKey ] || '北京',
})

const WrapperNavMenu = connect(mapState)(NavMenu)

export { WrapperNavMenu as view }
