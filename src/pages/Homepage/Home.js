import React, { Component } from 'react'
import { Carousel } from 'antd'
import { view as CardItem } from '../../components/CardItem'
import './static/style/home.less'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      serviceList: [
        {
          imgSrc: './images/beautify.png',
          title: '美容美甲',
          count: 128,
        },
        {
          imgSrc: './images/pet-feed.png',
          title: '宠物寄养',
          count: 128,
        },
        {
          imgSrc: './images/cleaner.png',
          title: '保洁',
          count: 128,
        },
        {
          imgSrc: './images/mobile-fixer.png',
          title: '手机维修',
          count: 128,
        },
        {
          imgSrc: './images/beautify.png',
          title: '美容美甲',
          count: 128,
        },
        {
          imgSrc: './images/beautify.png',
          title: '美容美甲',
          count: 128,
        },
        {
          imgSrc: './images/beautify.png',
          title: '美容美甲',
          count: 128,
        },
        {
          imgSrc: './images/beautify.png',
          title: '美容美甲',
          count: 128,
        },
      ],
    }
  }

  render () {
    const settings = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    }

    const h2Style = {
      marginTop: '50px',
      marginBottom: '20px'
    }
    return (
      <div className="home-container">
        <h2 style={h2Style}>附近的服务</h2>
        <Carousel { ...settings }>
          { this.state.serviceList.map(({ imgSrc, title, count }, index) => <CardItem
            imgSrc={ imgSrc }
            title={ title }
            count={ count }
            key={ index }
          />) }
        </Carousel>
        <h2 style={h2Style}>家政</h2>
        <Carousel { ...settings }>
          { this.state.serviceList.map(({ imgSrc, title, count }, index) => <CardItem
            imgSrc={ imgSrc }
            title={ title }
            count={ count }
            key={ index }
          />) }
        </Carousel>
        <h2 style={h2Style}>宠物</h2>
        <Carousel { ...settings }>
          { this.state.serviceList.map(({ imgSrc, title, count }, index) => <CardItem
            imgSrc={ imgSrc }
            title={ title }
            count={ count }
            key={ index }
          />) }
        </Carousel>
      </div>
    )
  }
}

export { Home as view }
