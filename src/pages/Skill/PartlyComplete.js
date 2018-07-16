import React from 'react'

import './static/style/partly-complete.less'

function PartlyComplete ({
                           username,
                           checkStatus,
                         }) {
  return (
    <div>
      <h2 style={ {marginTop: '50px'} }>完成的不错，{ username }</h2>
      { checkStatus < 1 && <p>接下来，上传一些认证资料，完成后即可接单</p> }
      <p style={ {marginBottom: '50px'} }>你也可以自行推广，我们将不收取任何费用</p>
      <div className="partly-complete-content-container">
        <div className="partly-complete-icon-wrapper">
          <i className="iconfont icon-selected"/>
        </div>
        <div className="content">个人资料和服务范围</div>
      </div>
      <div className="partly-complete-content-container">
        { checkStatus < 1
          ? <div className="partly-complete-number-wrapper">
            2
          </div>
          : <div className="partly-complete-icon-wrapper">
            <i className="iconfont icon-selected"/>
          </div>
        }
        <div className="content">上传认证信息</div>
      </div>
    </div>
  )
}

export { PartlyComplete as view }


