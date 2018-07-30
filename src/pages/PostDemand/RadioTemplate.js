import { Radio } from 'antd'
import React from 'react'

const {Group} = Radio

function RadioTemplate ({
                          title,
                          value,
                          options,
                          handleChange,
                        }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        <Group
          onChange={ handleChange }
          value={ value[0] }
        >
          {
            options.map(item => <Radio key={ item } value={ item }>{ item }</Radio>)
          }
        </Group>
      </div>
    </div>
  )
}

export { RadioTemplate as view }

