import { Input } from 'antd'
import React from 'react'

import './static/style/index.less'

function SecondaryCardItem ({
                              content,
                              isChecked,
                              handleClick,
                            }) {
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

function SelectType ({
                       selectedType,
                       secondaryTypeList,
                       handleSecondaryTypeClick,
                       secondServiceList,
                       secondaryInputType,
                       handleSecondaryInputType,
                       secondaryInputTypeTooLong,
                     }) {
  return (
    <div>
      <h2 style={ {marginTop: '50px', marginBottom: '50px'} }>让我们缩小一下范围？</h2>
      <div className="secondary-type-container">
        <h3>{ selectedType }</h3>
        <div className="secondary-type-select-container">
          {
            secondServiceList.map(({serviceTypeName, serviceTypeId}) =>
              <SecondaryCardItem
                content={ serviceTypeName }
                key={ serviceTypeId }
                isChecked={ secondaryTypeList.includes(serviceTypeId) }
                handleClick={ handleSecondaryTypeClick(serviceTypeId) }
              />,
            )
          }
        </div>
        <div style={ selectedType === '其他' || secondaryTypeList.includes(-1) ? {} : {display: 'none'} }>
          <p>
            请填写具体的工作技能
          </p>
          <Input
            value={ secondaryInputType }
            placeholder="工作技能"
            onChange={ handleSecondaryInputType }
          />
          { secondaryInputTypeTooLong && <div className="error-tip">无法继续输入</div> }
        </div>
      </div>
    </div>
  )
}

export { SelectType as view }


