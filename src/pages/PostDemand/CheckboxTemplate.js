import { Checkbox } from 'antd'
import React from 'react'

const { Group } = Checkbox

function CheckboxTemplates ({ title, options }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <Group options={ options }/>
      </div>
    </div>
  )
}

export { CheckboxTemplates as view }
