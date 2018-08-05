import { Button } from 'antd'
import React from 'react'

function Footer ({
                   complete,
                   pageData,
                   pageIndex,
                   goLastPage,
                   createDemandDisable,
                   handleGoNextButtonClick,
                   handleCompleteButtonClick,
                 }) {
  return (<div className="post-demand-footer-container">
    <p onClick={ goLastPage }>
      {
        pageIndex && !complete ? <span>
          <i className="iconfont icon-return"/>
          返回
        </span> : ''
      }
    </p>
    { complete
      ? <Button type="primary" onClick={ handleCompleteButtonClick }>
        完成
      </Button>
      : <Button
        type="primary"
        disabled={ pageData.filter(item => item.isNessary).some(item => {
          if (Array.isArray(item.resultValue)) {
            return !item.resultValue.filter(item => item !== null).length
          }
          return !item.resultValue
        }) || createDemandDisable }
        onClick={ handleGoNextButtonClick }
      >
        下一步
      </Button> }
  </div>)
}

export { Footer as view }
