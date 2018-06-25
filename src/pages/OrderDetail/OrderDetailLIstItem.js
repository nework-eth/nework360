import { Button, Rate } from 'antd'
import React from 'react'

function OrderDetailListItem ({
                                src,
                                pay,
                                name,
                                rate,
                                hireTime,
                                history,
                              }) {
  return (
    <div className="order-detail-list-item-wrapper">
      <div className="top-part">
        <div className="avatar-wrapper">
          <img src="" alt="头像"/>
          <span>在线沟通</span>
        </div>
        <div>320</div>
      </div>
      <div className="order-detail-name">
        Ron Head
      </div>
      <div className="middle">
        <Rate
          allowHalf
          disabled
          defaultValue={ 4.5 }
          character={ <i className="iconfont icon-rate-star-full"/> }
        />
        <p className="rate">{ 4.5 }</p>
        <p className="evaluation">(12条评价)</p>
      </div>
      <div className="bottom">
        <div>
          <div><i className="iconfont icon-hire"/>被雇佣128次</div>
          <div><i className="iconfont icon-joined-time"/>已加入3年几个月</div>
        </div>
        <Button type="primary">选择Ta</Button>
      </div>
    </div>
  )
}

export { OrderDetailListItem as view }
