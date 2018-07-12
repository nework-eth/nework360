import { message } from 'antd'
import QRCode from 'qrcode.react'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { getPayResult } from '../../service/pay/pay'

// function WechatPay ({location}) {
//   return (
//     <div>
//       <h2>微信扫码支付</h2>
//       { location.state && <QRCode value={ location.state.QR }/> }
//     </div>
//   )
// }

class WechatPay extends Component {
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
            if (this.props.location.state.type === 'cule') {
              browserHistory.push('/wallet')
            } else {
              browserHistory.push('/list')
            }
            return
          }
          if (status === 'fail') {
            message.error('购买失败')
            clearInterval(timer)

          }
        }
      } catch (e) {
        console.log(e)
        message.error('购买出错')
        clearInterval(timer)
      }
    }, 1000)
  }

  render () {
    return (
      <div>
        <h2>微信扫码支付</h2>
        { this.props.location.state && <QRCode value={ this.props.location.state.QR }/> }
      </div>
    )
  }

  componentDidMount () {
    this.polling()
  }
}

export { WechatPay as page }
