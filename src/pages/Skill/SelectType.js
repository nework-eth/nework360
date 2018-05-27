import React from 'react'

import { Input } from 'antd'
import './static/style/select-type.less'

function CardItem ({ imgSrc, title, isChecked }) {
  return (
    <div className="select-type-card-item">
      <img
        src={ imgSrc }
        width={ 50 }
        height={ 50 }
      />
      <p>{ title }</p>
    </div>
  )
}

function SelectType () {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>您打算开始什么类型的工作？</h2>
      <div className="select-type-card-container">
        <CardItem imgSrc='./images/家政-icon.png' title="家政1"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政2"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政3"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政4"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政5"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政6"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政7"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政8"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政9"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政10"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政11"/>
        <CardItem imgSrc='./images/家政-icon.png' title="家政12"/>
      </div>
      <p style={ {
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '10px',
      } }>请填写具体的工作类型</p>
      <Input
        placeholder="工作类型"
      />
    </div>
  )
}

export { SelectType as view }
