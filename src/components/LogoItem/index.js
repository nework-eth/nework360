import React from 'react'
import './static/style/logo-item.less'

function LogoItem ({ imgSrc, title, extraStyle = {}, handleClick }) {
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
          onClick={ handleClick }
        />
        <div className="title" onClick={ handleClick }>{ title }</div>
      </div>
    </div>
  )

}

export { LogoItem as view }
