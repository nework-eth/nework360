import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

function Introduce ({ introduce, handleIntroduceChange }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>简单介绍下自己</h2>
      <p style={ { marginBottom: '10px' } }>简介</p>
      <TextArea
        rows={ 8 }
        placeholder="简单介绍下你的工作经历，服务特色等，以获得更多的客户…"
        value={ introduce }
        onChange={ handleIntroduceChange }
      />
    </div>
  )
}

export { Introduce as view }
