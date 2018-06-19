import { Input } from 'antd'
import React from 'react'

function LocationTemplate ({ title }) {
  return (<div>
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <Input/>
      </div>
    </div>
  </div>)
}

export { LocationTemplate as view }

