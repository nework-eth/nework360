import { Button } from 'antd'
import React from 'react'

function Footer ({
                   handleGoBack,
                   handleNextPage,
                 }) {
  return (<div className="post-demand-footer-container">
    <p onClick={ handleGoBack }>
      <i className="iconfont icon-return"/>
      返回
    </p>
    <Button
      type="primary"
      onClick={ handleNextPage }
    >
      下一步
    </Button>
  </div>)
}

export { Footer as view }
