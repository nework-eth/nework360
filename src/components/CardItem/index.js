import React from 'react'
import { Card } from 'antd'
import './static/style/index.less'

const { Meta } = Card

function CardItem ({ imgSrc, title, count }) {
  return (
    <Card
      hoverable
      cover={ <img alt="example" src={ imgSrc } width={ 250 } height={ 168 }/> }
      bordered={false}
      className="reset-card"
    >
      <Meta
        title={ <h3>{ title }</h3> }
        description={ `${count} 服务商在您附近` }
      />
    </Card>
  )
}

export { CardItem as view }
