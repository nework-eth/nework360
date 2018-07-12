import React from 'react'

function MatchResultCardItem ({nickname, avatarSrc, handleClick}) {
  return <div className="match-result-card-item" onClick={ handleClick }>
    <img
      src={ avatarSrc || './images/headshot-default.png' }
      alt="头像"
      width="50px"
      height="50px"
    />
    <div className="name">{ nickname }</div>
  </div>
}

export { MatchResultCardItem }
