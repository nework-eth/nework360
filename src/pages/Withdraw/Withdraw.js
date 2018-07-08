import { Button, Input } from 'antd'
import React, { Component } from 'react'
import './static/style/index.less'

class Pay extends Component {

  state = {
    limit: 10,
    totalCount: '',
    serviceName: '深度清洁',
    servicePersonList: [],
  }

  render () {
    return (
      <div className="withdraw-container">
        <h2>申请提现</h2>
        <div className="virtual-title">提现金额</div>
        <Input
          placeholder="请输入提现金额，默认保留2位小数"
        />
        <div className="virtual-row"><span className="virtual-title">实际到账：</span><span>元</span></div>
        <div className="virtual-row"><span className="virtual-title">手续费：</span><span>元</span><span
          className="tip">手续费为提现金额的0.6%</span></div>
        <div className="virtual-row"><span className="virtual-title">提现到：</span><span>微信账户</span></div>
        <Button>提交申请</Button>
      </div>
    )
  }

  componentDidMount () {
  }

}

export { Pay as page }

