import React, { Component } from 'react'
import './static/style/search.less'
import { Input, Icon } from 'antd'
import { view as IconItem } from '../../components/LogoItem'

const Search = Input.Search

class SearchPage extends Component {
  constructor () {
    super()
    // this.state.iconListUrl = [
    //   './images/category-beauty.png',
    //   './images/category-education.png',
    //   './images/category-event.png',
    //   './images/category-fitness.png',
    //   './images/category-health.png',
    //   './images/category-fitness.png',
    //   './images/category-home.png',
    //   './images/category-other.png',
    //   './images/category-pets.png',
    //   './images/category-other.png',
    //   './images/category-photo.png',
    //   './images/category-repair.png',
    //   './images/category-tech-fix.png',
    //   './images/category-wedding.png',
    // ]
    this.state = {
      iconListUrl: [
        './images/category-home.png',
        './images/category-beauty.png',
        './images/category-health.png',
        './images/category-photo.png',
        './images/category-repair.png',
        './images/category-education.png',
        './images/category-tech-fix.png',
        './images/category-pets.png',
        './images/category-event.png',
        './images/category-fitness.png',
        './images/category-wedding.png',
        './images/category-other.png',
      ],
    }
  }

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
        <Search
          prefix={ <Icon type="search" style={ { fontSize: '18px', color: '#9ca6ae', paddingLeft: '10px' } }/> }
          className="search-input"
          placeholder="试试「小程序开发」"
          enterButton="搜索"
          size="large"
        />
        <div
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          } }
        >
          { this.state.iconListUrl.map((item, index) => {
            console.log(item)
            return <IconItem imgSrc={ item } title="test" key={ index }/>
          }) }
        </div>
        <h2>附近的服务</h2>
        <h2>家政</h2>
        <h2>宠物</h2>
        <h2>如何发布需求？</h2>
        <div>cardlist</div>
        <footer>1</footer>
      </div>
    )
  }
}

export { SearchPage as page }
