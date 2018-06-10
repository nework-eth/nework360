import { Input } from 'antd'
import React from 'react'

const { TextArea } = Input

function Introduce ({ introduce, handleDescriptionChange }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>简单介绍下自己</h2>
      <p style={ { marginBottom: '10px' } }>简介</p>
      <TextArea
        rows={ 8 }
        placeholder="简单介绍下你的工作经历，服务特色等，以获得更多的客户…"
        value={ introduce }
        onChange={ handleDescriptionChange }
      />
    </div>
  )
}

export { Introduce as view }
