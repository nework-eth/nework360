import { Checkbox } from 'antd'
import React from 'react'

const { Group } = Checkbox

function CheckboxTemplates ({
                              title,
                              value,
                              options,
                              handleChange,
                              isMultiChoice,
                            }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      { !!isMultiChoice && <p className="multi-tip">可选择多项</p> }
      <div className="form-item-wrapper">
        <Group
          value={ value }
          options={ options }
          onChange={ handleChange }
        />
      </div>
    </div>
  )
}

export { CheckboxTemplates as view }
