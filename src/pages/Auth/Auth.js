import React from 'react'

import { view as TopMenu } from '../../components/NavMenu'
import backgroundImage from './static/images/login-bg.png'

const containerStyle = {
  width: '100%',
  minHeight: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
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

