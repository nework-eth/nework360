import { Input } from 'antd'
import React from 'react'

const { TextArea } = Input

function TextAreaTemplate ({ title }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <TextArea
          rows={ 8 }
          placeholder="简单介绍下你的工作经历，服务特色等，以获得更多的客户…"
        />
      </div>
    </div>
  )
}

export { TextAreaTemplate as view }
