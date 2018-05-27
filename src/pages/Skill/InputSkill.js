import React from 'react'

// import { Input, Select } from 'antd'

function InputSkill ({selectedType}) {
  return (
    <div>
      <h2 style={ { marginTop: '50px' } }>让我们缩小一下范围？</h2>
      <p>{selectedType}</p>
      <div>保洁</div>
    </div>
  )
}

export { InputSkill as view }
