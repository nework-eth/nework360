import { Button, message } from 'antd'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { getPayResult } from '../../service/pay/pay'
import './static/style/index.less'

class WechatPay extends Component {
  state = {
    result: '',
    timerId: '',
  }

  polling = () => {
    let timer = setInterval(async () => {
      try {
        const {data: {code, status}} = await getPayResult({
          type: this.props.location.state.type,
          orderId: this.props.location.state.orderId,
          chargeId: this.props.location.state.chargeId,
        })
        if (code === 200) {
          if (status === 'succ') {
            message.success('购买成功')
            clearInterval(timer)
            this.setState({
              result: 'succ',
              timerId: '',
            })
            return
          }
          if (status === 'fail') {
            message.error('购买失败')
            clearInterval(timer)
            this.setState({
              result: 'fail',
              timerId: '',
            })
          }
        }
      } catch (e) {
        console.log(e)
        message.error('购买出错')
        clearInterval(timer)
      }
    }, 1000)
    this.setState({
      timerId: timer,
    })
  }

  handleGoBack = () => {
    browserHistory.go(-1)
  }

  continueToPay = () => {
    this.setState({
      result: '',
    })
    this.polling()
  }

  render () {
    if (this.state.result === 'succ') {
      return (
        <div className="wechat-pay-result">
          <img src="/images/pay-succeed.png" alt="支付成功" width='50' height='50'/>
          <h2>支付成功</h2>
          <p>返回 <Link to='/list'>我的订单</Link></p>
        </div>
      )
    }
    if (this.state.result === 'fail') {
      return (
        <div className="wechat-pay-result">
          <img src="/images/pay-error.png" alt="支付失败" width='50' height='50'/>
          <h2>支付失败</h2>
          <p>返回 <Link to='/list'>我的订单</Link> 或 <span className="virtual-link" onClick={ this.continueToPay }>继续支付</span>
          </p>
        </div>
      )
    }
    return (
      <div className="wechat-pay-container">
        <h2>微信扫码支付</h2>
        { this.props.location.state && <QRCode value={ this.props.location.state.QR }/> }
        <div><Button onClick={ this.handleGoBack }
          style={ {width: '160px', height: '50px', marginTop: '20px'} }>返回</Button></div>
      </div>
    )
  }

  componentDidMount () {
    this.polling()
  }
}

export { WechatPay as page }
