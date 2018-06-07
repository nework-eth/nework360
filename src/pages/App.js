import React from 'react'

import { view as TopMenu } from '../components/NavMenu'

const App = ({ children }) => {
  return (
    <div>
      <TopMenu/>
      <div>{ children }</div>
    </div>
  )
}

export default App
