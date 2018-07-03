import React from 'react'
import { view as TopMenu } from '../../components/NavMenu'
import './static/style/index.less'

const ContainerPage = ({children}) => {
  return (
    <div className="basic-container">
      <TopMenu/>
      <main>{ children }</main>
    </div>
  )
}

export { ContainerPage as page }

