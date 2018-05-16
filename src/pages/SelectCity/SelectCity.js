import React from 'react'
import { view as TopMenu } from '../../components/NavMenu'

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const SelectCity = () => {
  return (
    <div style={ containerStyle }>
      <TopMenu/>
      <div>
        <h2>选择城市</h2>
        <h3>搜索城市</h3>
      </div>
    </div>
  )
}

export { SelectCity as view }

