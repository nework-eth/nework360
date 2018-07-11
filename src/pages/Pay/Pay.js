import { Button } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { getPayInfo } from '../../service/needOrderDetail'
import './static/style/index.less'

class Pay extends Component {

  state = {
    amount: 0,
    needsId: '',
    userBName: '',
    selectedChannel: 'balance',
  }
  changeSelectedChannel = (channel) => () => {
    this.setState({
      selectedChannel: channel,
    })
  }
  pay = async () => {
    const {data: {data, code}} = await getPayInfo({
      channel: this.state.selectedChannel,
      amount: this.state.amount,
      needsId: this.state.needsId,
    })
    if (code === 200) {
      console.log(data)
    }
  }

  render () {
    const {
      amount,
      needsId,
      userBName,
      selectedChannel,
    } = this.state
    return (
      <div className="pay-container">
        <h2>支付订单</h2>
        <div className="pay-content-container">
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">订单号：</span><span>{ needsId }</span></div>
            <div className="list-row"><span className="virtual-title">商品名：</span><span>线索卡/服务</span></div>
            <div className="list-row"><span className="virtual-title">数量：</span><span>1</span></div>
          </div>
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">支付金额：</span><span>{ amount / 100 }元</span></div>
            <div className="list-row"><span className="virtual-title">到款账户：</span><span>{ userBName }</span></div>
            <div className="list-row"><span className="virtual-title">下单时间：</span><span>{ moment()
            .format('YYYY-MM-DD') }</span></div>
          </div>
        </div>
        <h3>选择支付方式</h3>
        <div className="virtual-button-wrapper">
          <div className={ selectedChannel === 'balance' ? 'virtual-button selected-virtual-button' : 'virtual-button' }
            onClick={ this.changeSelectedChannel('balance') }>
            <i className="iconfont icon-selected"/>
            <span>账户余额</span>
          </div>
          <div
            className={ selectedChannel === 'wx_pub_qr' ? 'virtual-button selected-virtual-button' : 'virtual-button' }
            onClick={ this.changeSelectedChannel('wx_pub_qr') }>
            <i className="iconfont icon-selected"/>
            <span>微信支付</span>
          </div>
        </div>
        <Button onClick={ this.pay }>立即支付</Button>
      </div>
    )
  }

  componentDidMount () {
    this.setState({
      needsId: this.props.location.state.needsId,
      amount: this.props.location.state.amount,
      userBName: this.props.location.state.userBName,
    })
  }

}

export { Pay as page }