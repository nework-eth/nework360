import React, { Component } from 'react'
import { Card } from 'antd'

const { Meta } = Card

function CardItem ({ imgSrc, title, count }) {
  return (
    <Card
      hoverable
      style={ { width: '250px', height: '230px' } }
      cover={ <img alt="example" src={ imgSrc } width={ 250 } height={ 168 }/> }
    >
      <Meta
        title={ <h3>{ title }</h3> }
        description={ `${count} 服务商在您附近` }
      />
    </Card>
  )
}

export { CardItem as view }
