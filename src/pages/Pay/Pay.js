import { Button } from 'antd'
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
      <div className="pay-container">
        <h2>支付订单</h2>
        <div className="pay-content-container">
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">订单号：</span><span>JY241414141</span></div>
            <div className="list-row"><span className="virtual-title">商品名：</span><span>线索卡/服务</span></div>
            <div className="list-row"><span className="virtual-title">数量：</span><span>1</span></div>
          </div>
          <div className="list-container">
            <div className="list-row"><span className="virtual-title">支付金额：</span><span>22</span></div>
            <div className="list-row"><span className="virtual-title">到款账户：</span><span>Ron Heard</span></div>
            <div className="list-row"><span className="virtual-title">下单时间：</span><span>2018-7-22</span></div>
          </div>
        </div>
        <h3>选择支付方式</h3>
        <div className="virtual-button-wrapper">
          <div className="virtual-button">
            <i className="iconfont icon-selected"/>
            <span>账户余额</span>
          </div>
          <div className="virtual-button">
            <i className="iconfont icon-selected"/>
            <span>微信支付</span>
          </div>
        </div>
        <Button>立即支付</Button>
      </div>
    )
  }

  componentDidMount () {
  }

}

export { Pay as page }