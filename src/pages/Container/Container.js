import React from 'react'
import { view as TopMenu } from '../../components/NavMenu'

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const ContainerPage = ({ children }) => {
  return (
    <div style={ containerStyle }>
      <TopMenu/>
      { children }
    </div>
  )
}

export { ContainerPage as page }

