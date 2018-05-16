import React, { Component } from 'react'
import './static/style/search.less'
import { Input, Icon, Carousel } from 'antd'
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
            justifyContent: 'space-between',
          } }
        >
          { this.state.iconListUrl.map((item, index) => {
            console.log(item)
            return <IconItem imgSrc={ item } title="test" key={ index }/>
          }) }
        </div>
        { /*<h2>附近的服务</h2>*/ }
        { /*/!*<Carousel*!/*/ }
        { /*/!*effect="fade"*!/*/ }
        { /*/!*vertical={true}*!/*/ }
        { /*/!*>*!/*/ }
        { /*/!*<div><h3>1</h3></div>*!/*/ }
        { /*/!*<div><h3>2</h3></div>*!/*/ }
        { /*/!*<div><h3>3</h3></div>*!/*/ }
        { /*/!*<div><h3>4</h3></div>*!/*/ }
        { /*/!*</Carousel>*!/*/ }
        { /*<h2>家政</h2>*/ }
        { /*<h2>宠物</h2>*/ }
        { /*<h2>如何发布需求？</h2>*/ }
        { /*<div>cardlist</div>*/ }
        { this.props.children }
        <h2>如何发布需求</h2>
        <div className="introduce-container">
          <div className="introduce-card">
            <h3>回答需求问卷</h3>
            <p>耗时1min左右，需要您简单选择几个问题，以便于服务人员清楚您的需要</p>
          </div>
          <div className="introduce-card">
            <h3>服务人员报价</h3>
            <p>服务人员将根据您的回答响应您的诉求，我们将推荐1位或者更多供您选择</p>
          </div>
          <div className="introduce-card">
            <h3>线下享受服务</h3>
            <p>服务人员将上门为您服务，您可为服务的感受和满意程度打分</p>
          </div>
        </div>
      </div>
    )
  }
}

export { SearchPage as page }
