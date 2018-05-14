import React from 'react'

import { view as TopMenu } from '../../components/TopMenu'
import backgroundImage from './static/images/login-bg.png'

const containerStyle = {
  width: '100%',
  minHeight: '100%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
}

const App = ({ children }) => {
  return (
    <div style={ containerStyle }>
      <TopMenu/>
      <div>
        { children }
      </div>
    </div>
  )
}

export default App