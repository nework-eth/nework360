import React from 'react'

import { Link } from 'react-router'

const liStyle = {
  display: 'inline-block',
  padding: '0 30px',
  verticalAlign: 'middle',
}

const verticalLine = {
  display: 'inline-block',
  width: '1px',
  height: '30px',
  verticalAlign: 'middle',
  backgroundColor: '#edf1f4',
}

const containerStyle = {
  height: '70px',
  backgroundColor: '#fff',
  position: 'relative',
}

const ulStyle = {
  position: 'absolute',
  transform: 'translateY(-50%)',
  top: '50%',
  display: 'flex',
  width: '100%',
  height: '60px',
  lineHeight: '60px',
  justifyContent: 'space-between',
}

const view = () => {
  return (
    <div style={ containerStyle }>
      <ul style={ ulStyle }>
        <div>
          <li style={ liStyle }>Nework</li>
          <li style={ verticalLine }/>
          <li style={ liStyle }>北京</li>
          <li style={ { ...liStyle, ...{ paddingLeft: '10px' } } }>切换</li>
        </div>
        <div>
          <li style={ { ...liStyle, ...{ paddingRight: '20px' } } }>如何运作？</li>
          <li style={ verticalLine }/>
          <li style={ liStyle }><Link to="/login">登录</Link></li>
          <li style={ { ...liStyle, ...{ paddingLeft: '0', paddingRight: '20px' } } }><Link to="/register">注册</Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export { view }
