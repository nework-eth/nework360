import React, { Component } from 'react'
import { view as CardItem } from '../../components/CardItem'
import './static/style/first-class.less'

class FirstClass extends Component {
  constructor () {
    super()
    this.state = {
      cardList: [
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
        {
          imgSrc: './images/category-home.png',
          title: 'test',
          count: 1,
        },
      ],
    }
  }

  render () {
    return (
      <div>
        <h2>全部家政服务</h2>
        <div className="card-item-container">
          { this.state.cardList.map(({ imgSrc, title, count }) =>
            <CardItem
              imgSrc={ imgSrc }
              title={ title }
              count={ count }
            />,
          ) }
        </div>
      </div>
    )
  }
}

export { FirstClass as view }

