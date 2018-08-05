import React from 'react'
import { Link } from 'react-router'
import './static/style/index.less'

function PaySuccess () {
  return (
    <div className="pay-result">
      <img src="/images/pay-succeed.png" alt="支付成功" width='50' height='50'/>
      <h2>支付成功</h2>
      <p>返回 <Link to='/list'>我的订单</Link></p>
    </div>
  )
}

export { PaySuccess as page }
