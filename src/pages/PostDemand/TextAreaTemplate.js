import { Input } from 'antd'
import React from 'react'

const { TextArea } = Input

function TextAreaTemplate ({ title, value, handleChange }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <TextArea
          rows={ 8 }
          value={ value }
          onChange={ (e) => handleChange(e.target.value) }
          placeholder="请输入内容描述..."
        />
      </div>
    </div>
  )
}

export { TextAreaTemplate as view }
