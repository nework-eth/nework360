import React from 'react'

function MatchResultCardItem ({nickname, avatarSrc}) {
  return <div className="match-result-card-item">
    <img
      src={ avatarSrc }
      alt="头像"
      width="50px"
      height="50px"
    />
    <div className="name">{ nickname }</div>
  </div>
}

export { MatchResultCardItem }
