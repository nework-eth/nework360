import React from 'react'

import { Select } from 'antd'

const Option = Select.Option

function Authenticate ({ username }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px' } }>您希望使用哪种身份证件进行认证？</h2>
      <p>只能添加由政府颁发的有效身份证件</p>
      <p>签发国家/地区</p>
      <Select>
        <Option>中国</Option>
      </Select>
      <p>身份证件类型</p>
      <div>
        <div>护照</div>
        <div>身份证</div>
      </div>
      <p>你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { Authenticate as view }




