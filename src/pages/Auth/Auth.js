import React from 'react'

import { view as TopMenu } from '../../components/NavMenu'
import './static/style/index.less'

const Page = ({ children }) => {
  return (
    <div className="auth-container">
      <TopMenu/>
      <main>
        <div className="form-wrapper">
          { children }
        </div>
      </main>
    </div>
  )
}

export { Page as page }

