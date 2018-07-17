import { Button, Input, message } from 'antd'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { Link } from 'react-router'

import { getVerifyStatus, getWxQR, withdraw } from '../../service/withdraw/withdraw'
import './static/style/index.less'

class Pay extends Component {

  state = {
    QRUrl: '',
    amount: 0,
    showQRCode: false,
    showResult: false,
    hasVerified: false,
  }

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    })
  }
  getVerifyStatus = async () => {
    const {data: {code, status}} = await getVerifyStatus()
    if (code === 200) {
      this.setState({
        hasVerified: status === 'succ',
      })
    }
  }
  getWxQR = async () => {
    const {data: {code, url}} = await getWxQR()
    if (code === 200) {
      this.setState({
        QRUrl: url,
        showQRCode: true,
      })
    }
    this.polling()
  }

  polling = () => {
    let timer = setInterval(async () => {
      try {
        const {data: {code, status}} = await getVerifyStatus()
        if (code === 200) {
          if (status === 'succ') {
            message.success('认证成功')
            clearInterval(timer)
            this.setState({
              showQRCode: false,
              hasVerified: true,
            })
            return
          }
          if (status === 'fail') {
            message.error('人称失败')
            clearInterval(timer)
          }
        }
      } catch (e) {
        console.log(e)
        message.error('认证出错')
        clearInterval(timer)
      }
    }, 1000)
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
  verify = () => {
    this.getWxQR()
  }

  render () {
    const {
      QRUrl,
      amount,
      showQRCode,
      showResult,
      hasVerified,
    } = this.state
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
          disabled={ !hasVerified }
          onChange={ this.handleAmountChange }
        />
        <div className="virtual-row"><span
          className="virtual-title">实际到账： </span><span>{ (amount * (1 - 0.006)).toFixed(2) } 元</span>
        </div>
        <div className="virtual-row"><span
          className="virtual-title">手续费：</span><span>{ (amount * 0.006).toFixed(2) } 元</span><span
          className="tip">手续费为提现金额的0.6%</span></div>
        <div className="virtual-row"><span className="virtual-title">提现到：</span>
          <i className="iconfont icon-wechat"/>
          <span>  微信账户</span><span>（{
            hasVerified ? '已授权' : <span className="verify-now" onClick={ this.verify }>立即授权</span>
          }）</span>
        </div>
        { showQRCode && <div className="qr-wrapper"><QRCode value={ QRUrl }/></div> }
        <Button onClick={ this.submitWithdraw } disabled={ !hasVerified }>提交申请</Button>
      </div>
    )
  }

  componentDidMount () {
    this.getVerifyStatus()
  }

}

export { Pay as page }

