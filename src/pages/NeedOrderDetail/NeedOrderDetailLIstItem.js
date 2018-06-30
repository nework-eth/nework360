import { Button, Rate } from 'antd'
import React from 'react'

function NeedOrderDetailLIstItem ({
                                    score,
                                    amount,
                                    nickname,
                                    hireTimes,
                                    avatarSrc,
                                    scoreCount,
                                    joinedTime,
                                    cancelOrder,
                                    selectPartyB,
                                    buttonStatus,
                                    handleEvaluate,
                                  }) {
  return (
    <div
      className={ `order-detail-list-item-wrapper ${buttonStatus !== 'disabled' && buttonStatus !== 'select' ? 'selected-order-detail-list-item' : ''}` }>
      <i className="iconfont icon-selected"/>
      <div className="top-part">
        <div className="avatar-wrapper">
          <img src={ avatarSrc } alt="头像" width={ 50 } height={ 50 }/>
          <span className="online-communicate">在线沟通</span>
        </div>
        <div className="amount">{ `¥ ${amount}` }</div>
      </div>
      <h3>
        { nickname }
      </h3>
      <div className="middle">
        <Rate
          allowHalf
          disabled
          defaultValue={ score }
          character={ <i className="iconfont icon-rate-star-full"/> }
        />
        <p className="rate">{ score }</p>
        <p className="evaluation">（{ scoreCount }条评价）</p>
      </div>
      <div className="bottom">
        <div className="info-wrapper">
          <div><i className="iconfont icon-hire"/>被雇佣{ hireTimes }次</div>
          <div><i className="iconfont icon-joined-time"/>{ joinedTime }</div>
        </div>
        {
          buttonStatus === 'selected' && <Button type="primary" onClick={ selectPartyB }>选择Ta</Button>
        }
        {
          buttonStatus === 'disabled' && <Button disabled={ true }>选择Ta</Button>
        }
        {
          buttonStatus === 'cancelOrder' && <Button onClick={ cancelOrder }>取消订单</Button>
        }
        {
          buttonStatus === 'pay' && <Button>立即支付</Button>
        }
        {
          buttonStatus === 'evaluate' && <Button type="primary" onClick={ handleEvaluate }>立即评价</Button>
        }
      </div>
    </div>
  )
}

export { NeedOrderDetailLIstItem as view }
