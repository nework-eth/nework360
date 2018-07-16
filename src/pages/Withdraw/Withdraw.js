import { Button, Input, message } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router'

import { withdraw } from '../../service/withdraw/withdraw'
import './static/style/index.less'

class Pay extends Component {

  state = {
    amount: 0,
    showResult: false,
  }
  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    })
  }

  componentDidMount () {
  }

  submitWithdraw = async () => {
    const amount = this.state.amount
    if (!amount) {
      message.error('请输入提现金额')
      return
    }
    if (amount <= 0) {
      message.error('请输入大于零的提现金额')
      return
    }
    const {data: {code}} = await withdraw({amount: amount * 100})
    if (code === 200) {
      message.success('已提交申请')
      this.setState({
        showResult: true,
      })
    }
  }

  render () {
    const {amount, showResult} = this.state
    if (showResult) {
      return (
        <div className="withdraw-result">
          <img src="/images/pay-succeed.png" alt="申请成功" width='50' height='50'/>
          <h2>提现申请提交成功</h2>
          <p>工作人员将于 5 个工作日内处理打款申请</p>
          <Link to="/">返回首页</Link>
        </div>
      )
    }
    return (
      <div className="withdraw-container">
        <h2>申请提现</h2>
        <div className="virtual-title">提现金额（元）</div>
        <Input
          placeholder="请输入提现金额（元），默认保留2位小数"
          value={ amount }
          onChange={ this.handleAmountChange }
        />
        <div className="virtual-row"><span
          className="virtual-title">实际到账： </span><span>{ (amount * (1 - 0.006)).toFixed(2) } 元</span>
        </div>
        <div className="virtual-row"><span
          className="virtual-title">手续费：</span><span>{ (amount * 0.006).toFixed(2) } 元</span><span
          className="tip">手续费为提现金额的0.6%</span></div>
        <div className="virtual-row"><span className="virtual-title">提现到：</span><span>微信账户</span></div>
        <Button onClick={ this.submitWithdraw }>提交申请</Button>
      </div>
    )
  }

}

export { Pay as page }

