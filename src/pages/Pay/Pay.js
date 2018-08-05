import { Button, message } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { buyClueCard, getClueCardPayInfo } from '../../service/clueCard'
import { getPayInfo } from '../../service/needOrderDetail'
import './static/style/index.less'

class Pay extends Component {

  state = {
    count: 1,
    amount: 1,
    needsId: '',
    orderId: '',
    userBName: '',
    selectedChannel: 'balance',
  }
  changeSelectedChannel = (channel) => () => {
    this.setState({
      selectedChannel: channel,
    })
  }
  pay = async () => {
    if (this.props.location.state.type === 'clue') {
      if (this.state.selectedChannel === 'balance') {
        const {data: {code}} = await buyClueCard({
          channel: 'balance',
          amount: this.state.amount,
          orderNo: this.state.orderId,
          culeCount: this.props.location.state.count,
        })
        if (code === 200) {
          message.success('购买线索卡成功')
          browserHistory.push('/pay-success')
        } else {
          browserHistory.push('/pay-fail')
        }
      } else {
        const {data: {data, code}} = await buyClueCard({
          channel: 'wx_pub_qr',
          amount: this.state.amount,
          orderNo: this.state.orderId,
          culeCount: this.props.location.state.count,
        })
        if (code === 200) {
          browserHistory.push(
            {
              pathname: '/wechat-pay',
              state: {
                QR: data.credential.wx_pub_qr,
                orderId: this.state.orderId,
                chargeId: data.id,
                type: 'cule',
              },
            },
          )
        }
      }
    } else {
      if (this.state.selectedChannel === 'balance') {
        const {data: {code}} = await getPayInfo({
          channel: this.state.selectedChannel,
          amount: this.state.amount,
          needsId: this.state.needsId,
        })
        if (code === 200) {
          message.success('支付成功')
          browserHistory.push('/pay-success')
        } else {
          browserHistory.push('/pay-fail')
        }
      } else {
        const {data: {data, code}} = await getPayInfo({
          channel: this.state.selectedChannel,
          amount: this.state.amount,
          needsId: this.state.needsId,
        })
        if (code === 200) {
          browserHistory.push(
            {
              pathname: '/wechat-pay',
              state: {
                QR: data.credential.wx_pub_qr,
                orderId: this.state.orderId,
                chargeId: data.id,
                type: 'orderNeeds',
              },
            },
          )
        }
      }
    }
  }
  getClueCardPayInfo = async () => {
    const {data: {code, orderNo, amount}} = await getClueCardPayInfo({culeCount: this.props.location.state.count})
    if (code === 200) {
      this.setState({
        orderId: orderNo,
        amount,
      })
    }
  }

  goBack = () => browserHistory.go(-1)

  render () {
    const {
      count,
      amount,
      orderId,
      userBName,
      selectedChannel,
    } = this.state
    return (
      <div className="pay-container">
        <div className="pay-container-title-wrapper">
          <h2>支付订单</h2>
          <Button onClick={ this.goBack }>返回</Button>
        </div>
        <div className="pay-content-container">
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">订单号：</span><span>{ orderId }</span></div>
            <div className="list-row"><span
              className="virtual-title">商品名：</span><span>{ this.props.location.state.type === 'clue' ? '线索卡' : '服务' }</span>
            </div>
            <div className="list-row"><span className="virtual-title">数量：</span><span>{ count }</span></div>
          </div>
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">支付金额：</span><span>{ amount / 100 }元</span></div>
            <div className="list-row"><span className="virtual-title">到款账户：</span><span>{ userBName || 'system' }</span>
            </div>
            <div className="list-row"><span className="virtual-title">下单时间：</span><span>{ moment()
            .format('YYYY-MM-DD') }</span></div>
          </div>
        </div>
        <h3>选择支付方式</h3>
        <div className="virtual-button-wrapper">
          <div className={ selectedChannel === 'balance' ? 'virtual-button selected-virtual-button' : 'virtual-button' }
            onClick={ this.changeSelectedChannel('balance') }>
            <i className="iconfont icon-selected"/>
            <img src="./images/balance.png" alt="余额支付" width="109" height="32"/>
          </div>
          <div
            className={ selectedChannel === 'wx_pub_qr' ? 'virtual-button selected-virtual-button' : 'virtual-button' }
            onClick={ this.changeSelectedChannel('wx_pub_qr') }>
            <i className="iconfont icon-selected"/>
            <img src="./images/wechatpay.png" alt="微信支付" width="110" height="30"/>
          </div>
        </div>
        <Button onClick={ this.pay }>立即支付</Button>
      </div>
    )
  }

  componentDidMount () {
    if (this.props.location.state.type === 'clue') {
      this.setState(
        {
          count: this.props.location.state.count,
        },
        () => {
          this.getClueCardPayInfo()
        })
    } else {
      this.setState({
        needsId: this.props.location.state.needsId,
        orderId: this.props.location.state.needsId,
        amount: this.props.location.state.amount,
        userBName: this.props.location.state.userBName,
      })
    }
  }

}

export { Pay as page }