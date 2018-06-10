import React, { Component } from 'react'
import './static/style/index.less'

class Footer extends Component {
  render () {
    return (
      <div className="footer-container">
        <div className="content-wrapper">
          <div className="logo">
            <i className="iconfont icon-logo" style={ { fontSize: '24px' } }/>
            <div className="footer-icon-container">
              <div className="icon-wrapper"
                style={ { backgroundColor: '#0FB047' } }
              >
                <i className="iconfont icon-wechat"/>
              </div>
              <div
                className="icon-wrapper"
                style={ { backgroundColor: '#219FEF' } }
              >
                <i className="iconfont icon-twitter"/>
              </div>
              <div
                className="icon-wrapper"
                style={ { backgroundColor: '#292929' } }
              >
                <i className="iconfont icon-medium"/>
              </div>
            </div>
          </div>
          <div className="communicate">
            <p>联系我们</p>
            <p>电话 010-57026742</p>
            <p>邮箱 service@pmcaff.com</p>
            <p><a target="_blank" rel="noopener noreferrer" href="http://nework.pro">官方网站 nework.pro</a></p>
          </div>
          <div className="link">
            <p>友情链接</p>
            <p><a target="_blank" rel="noopener noreferrer" href="https://www.pmcaff.com">PMCAFF.com</a></p>
            <p><a target="_blank" rel="noopener noreferrer" href="https://http://www.waibaodashi.com/">外包大师</a></p>
            <p><a target="_blank" rel="noopener noreferrer" href="http://atdesigner.pmcaff.com/#/">@设计狮</a></p>
          </div>
        </div>
        <div className="horizontal-line"/>
        <div className="copy-right">© Nework 2018</div>
      </div>
    )
  }
}

export { Footer as view }