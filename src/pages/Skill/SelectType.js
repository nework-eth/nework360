import { Input } from 'antd'
import React from 'react'
import './static/style/select-type.less'

function CardItem ({ imgSrc, title, isSelected, handleClick }) {
  return (
    <div
      className={
        isSelected
          ? 'select-type-card-item selected-card-item'
          : 'select-type-card-item'
      }
      onClick={ handleClick }
    >
      <img
        src={ imgSrc }
        width={ 50 }
        height={ 50 }
        alt={ title }
      />
      <i className="iconfont icon-selected"/>
      <p>{ title }</p>
    </div>
  )
}

const cardItemList = [
  {
    imgSrc: './images/家政-icon.png',
    title: '家政',
    isChecked: 'true',
  },
  {
    imgSrc: './images/美容美甲-icon.png',
    title: '美容美甲',
  },
  {
    imgSrc: './images/健康-icon.png',
    title: '健康',
  },
  {
    imgSrc: './images/摄影摄像-icon.png',
    title: '摄影摄像',
  },
  {
    imgSrc: './images/上门维修-icon.png',
    title: '上门维修',
  },
  {
    imgSrc: './images/教育培训-icon.png',
    title: '教育培训',
  },
  {
    imgSrc: './images/数码维修-icon.png',
    title: '数码维修',
  },
  {
    imgSrc: './images/宠物-icon.png',
    title: '宠物',
  },
  {
    imgSrc: './images/活动-icon.png',
    title: '活动',
  },
  {
    imgSrc: './images/运动健身-icon.png',
    title: '运动健身',
  },
  {
    imgSrc: './images/婚礼策划-icon.png',
    title: '婚礼策划',
  },
  {
    imgSrc: './images/其他-icon.png',
    title: '其他',
  },
]

function SelectType ({
                       handleSelectType,
                       selectedType,
                       handleInputType,
                       inputType,
                       firstServiceList,
                       inputTypeTooLong,
                     }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>您打算开始什么类型的工作？</h2>
      <div className="select-type-card-container">
        {
          firstServiceList.map(({ serviceTypeName }) =>
            <CardItem
              imgSrc={
                (cardItemList.find(item => item.title === serviceTypeName)
                  && (cardItemList.find(item => item.title === serviceTypeName)).imgSrc)
                || './images/其他-icon.png' }
              title={ serviceTypeName }
              key={ serviceTypeName }
              isSelected={ serviceTypeName === selectedType }
              handleClick={ handleSelectType(serviceTypeName) }
            />)
        }
      </div>
      <div style={ selectedType === '其他' ? {
        marginTop: '20px',
      } : { display: 'none' } }>
        <p style={ {
          fontWeight: 'bold',
          marginBottom: '10px',
        } }>
          请填写具体的工作类型
        </p>
        <Input
          value={ inputType }
          placeholder="工作类型"
          onChange={ handleInputType }
        />
        { inputTypeTooLong && <div className="error-tip">无法继续输入</div> }
      </div>
    </div>
  )
}

export { SelectType as view }
