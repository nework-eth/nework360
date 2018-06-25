import { Button } from 'antd'
import React from 'react'

function Footer ({
                   pageData,
                   goLastPage,
                   pageIndex,
                   handleGoNextButtonClick,
                 }) {
  return (<div className="post-demand-footer-container">
    <p onClick={ goLastPage }>
      {
        pageIndex ? <span>
          <i className="iconfont icon-return"/>
          返回
        </span> : ''
      }
    </p>
    <Button
      type="primary"
      disabled={ pageData.filter(item => item.isNessary).some(item => {
        if (Array.isArray(item.resultValue)) {
          return !item.resultValue.length
        }
        return !item.resultValue
      }) }
      onClick={ handleGoNextButtonClick }
    >
      下一步
    </Button>
  </div>)
}

export { Footer as view }
