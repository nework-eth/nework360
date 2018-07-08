import { Card } from 'antd'
import React from 'react'
import './static/style/index.less'

const {Meta} = Card

function CardItem ({imgSrc, title, count, jumpToRequirement}) {
  return (
    <Card
      hoverable
      cover={ <img alt="example" src={ imgSrc } width={ 250 } height={ 168 }/> }
      bordered={ false }
      className="reset-card"
      onClick={ jumpToRequirement }
    >
      <Meta
        title={ <h3>{ title }</h3> }
        description={ `${count} 服务商在您附近` }
      />
    </Card>
  )
}

export { CardItem as view }
