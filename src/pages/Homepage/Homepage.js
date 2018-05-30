import React from 'react'
import { view as Footer } from '../../components/Footer'
import { view as TopMenu } from '../../components/NavMenu'

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
  paddingBottom: '353px',
}

const Homepage = ({ children }) => {
  return (
    <div style={ containerStyle }>
      <TopMenu/>
      <div>
        { children }
      </div>
      <Footer/>
    </div>
  )
}

export { Homepage as page }