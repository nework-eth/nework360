import { Input } from 'antd'
import React from 'react'

import './static/style/index.less'

function SecondaryCardItem ({ content, isChecked, handleClick }) {
  return (
    <div
      className={
        isChecked
          ? 'select-type-card-item selected-card-item'
          : 'select-type-card-item'
      }
      onClick={ handleClick }
    >
      <i className="iconfont icon-selected"/>
      { content }
    </div>
  )
}

const secondaryList = [
  '保洁',
  '草坪维护及保养',
  '室内设计',
  '勤杂工',
  '屋顶维修及保养',
  '电视安装',
  '总承包服务',
  '景观美化',
  '室内粉刷',
  '地毯清洁',
  '压力清洗',
  '其他',
]

function SelectType ({
                       selectedType,
                       secondaryTypeList,
                       handleSecondaryTypeClick,
                       secondServiceList,
                     }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>让我们缩小一下范围？</h2>
      <div className="secondary-type-container">
        <h3>{ selectedType }</h3>
        <div className="secondary-type-select-container">
          {
            secondServiceList.map(({ serviceTypeName, serviceTypeId }) =>
              <SecondaryCardItem
                content={ serviceTypeName }
                key={ serviceTypeId }
                isChecked={ secondaryTypeList.includes(serviceTypeId) }
                handleClick={ handleSecondaryTypeClick(serviceTypeId) }
              />,
            )
          }
        </div>
        <div style={ secondaryTypeList.includes('其他') ? {} : { display: 'none' } }>
          <p>
            请填写具体的工作技能
          </p>
          <Input placeholder="工作技能"/>
        </div>
      </div>
    </div>
  )
}

export { SelectType as view }


