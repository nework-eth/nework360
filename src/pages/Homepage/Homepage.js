import React from 'react'
import { view as TopMenu } from '../../components/NavMenu'

const containerStyle = {
  width: '100%',
  minHeight: '100%',
}

const Page = ({ children }) => {
  return (
    <div style={ containerStyle }>
      <TopMenu/>
      <div>
        { children }
      </div>
    </div>
  )
}

export { Page as page }