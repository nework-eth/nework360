import React, { Component } from 'react'
import './static/style/search.less'
import { Input, Icon } from 'antd'

const Search = Input.Search

class Page extends Component {
  render () {
    return (
      <div className="search-container">
        <div>
          <i
            className="iconfont icon-logo"
            style={ { fontSize: '40px', lineHeight: '50px' } }
          />
        </div>
        <h1>找到所有本地专业服务</h1>
        { /*<Input*/ }
        { /*prefix={ <Icon type="search" style={ { fontSize: '16px', color: '#9ca6ae' } }/> }*/ }
        { /*className="search-input"*/ }
        { /*placeHolder="试试「小程序开发」"*/ }
        { /*/>*/ }
        <Search
          prefix={ <Icon type="search" style={ { fontSize: '16px', color: '#9ca6ae' } }/> }
          className="search-input"
          placeholder="试试「小程序开发」"
          enterButton="搜索"
          size="large"
        />
        <div>iconlist</div>
        <div>cardlist</div>
        <footer>1</footer>
      </div>
    )
  }
}

export { Page as page }
