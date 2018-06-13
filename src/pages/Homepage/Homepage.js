import React from 'react'
import { view as Footer } from '../../components/Footer'
import { view as TopMenu } from '../../components/NavMenu'
import './static/style/index.less'

const Homepage = ({ children }) => {
  return (
    <div className="homepage-container">
      <TopMenu/>
      <main>
        { children }
      </main>
      <Footer/>
    </div>
  )
}

export { Homepage as page }