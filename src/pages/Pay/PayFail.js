import React from 'react'
import { browserHistory, Link } from 'react-router'
import './static/style/index.less'

const continueToPay = () => {
  browserHistory.go(-1)
}

function PayFail () {
  return (
    <div className="pay-result">
      <img src="/images/pay-error.png" alt="支付失败" width='50' height='50'/>
      <h2>支付失败</h2>
      <p>返回 <Link to='/list'>我的订单</Link> 或 <span className="virtual-link" onClick={ continueToPay }>继续支付</span>
      </p>
    </div>
  )
}

export { PayFail as page }

