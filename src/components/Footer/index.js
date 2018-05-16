import React, { Component } from 'react'
import './static/style/index.less'

class Footer extends Component {
  render () {
    return (
      <div className="footer-container">
        <div className="content-wrapper">
          <div className="logo">
            <i className="iconfont icon-logo" style={ { fontSize: '24px' } }/>
            <div>span</div>
          </div>
          <div className="communicate">
            <p>联系我们</p>
            <p>电话 010-57026742</p>
            <p>邮箱 service@pmcaff.com</p>
            <p>官方网站 nework.pro</p>
          </div>
          <div className="link">
            <p>友情链接</p>
            <p>PMCAFF.com</p>
            <p>外包大师</p>
            <p>@设计狮</p>
          </div>
        </div>
        <div className="horizontal-line"/>
        <div className="copy-right">© Nework 2018</div>
      </div>
    )
  }
}

export { Footer as view }