import React from 'react'

import { Link } from 'react-router'

import './static/style/index.less'

const specialLinkStyle = {
  color: '#082135',
  textDecoration: 'none',
}

const view = () => {
  return (
    <div className="top-nav-container">
      <ul>
        <div className="li-wrapper">
          <li className="li-item"><i className="iconfont icon-logo logo-item"/></li>
          <li className="vertical-line"/>
          <li className="li-item" style={ { paddingRight: '10px' } }>北京</li>
          <li className="li-item" style={ { paddingLeft: '10px' } }><a>切换</a></li>
        </div>
        <div className="li-wrapper">
          <li style={ { paddingRight: '20px' } } className="li-item">如何运作？</li>
          <li className="vertical-line"/>
          <li className="li-item"><Link to="/login" style={ specialLinkStyle }>登录</Link></li>
          <li
            className="li-item" style={ { paddingLeft: '0' } }><Link to="/register"
            style={ specialLinkStyle }>注册</Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export { view }
