import React from 'react'
import './static/style/logo-item.less'

function LogoItem ({ imgSrc, title, extraStyle = {} }) {
  return (
    <div
      className="logo-item-container"
      style={ extraStyle }
    >
      <div>
        <img
          src={ imgSrc }
          alt={ title }
          height={ 50 }
        />
        <div>{ title }</div>
      </div>
    </div>
  )

}

export { LogoItem as view }
