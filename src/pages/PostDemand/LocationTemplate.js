import { Input, Select } from 'antd'
import React from 'react'

const Option = Select.Option

function LocationTemplate ({
                             title,
                             value,
                             locationOptions,
                             handleLocationChange,
                           }) {
  return (<div>
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <p>您的位置</p>
        <Select
          value={ value }
          mode="combobox"
          showArrow={ false }
          className="place-select"
          onChange={ handleLocationChange }
          placeholder="如不清楚可输入名称来搜索"
          defaultActiveFirstOption={ false }
        >
          { locationOptions.map(({ name, address, district, adcode }) =>
            <Option
              value={ `${district} ${address} ${name}` }
              key={ `${adcode}${address}` }
            >
              { `${district} ${address} ${name}` }
            </Option>,
          ) }
        </Select>
        <p>楼栋/门牌号信息</p>
        <Input
          placeholder="请输入"
        />
      </div>
    </div>
  </div>)
}

export { LocationTemplate as view }

