import { Button, Rate } from 'antd'
import React from 'react'
import { getRate } from '../../utils'

function NeedOrderDetailLIstItem ({
                                    score,
                                    amount,
                                    nickname,
                                    jumpToPay,
                                    hireTimes,
                                    avatarSrc,
                                    scoreCount,
                                    joinedTime,
                                    showIMModal,
                                    cancelOrder,
                                    selectPartyB,
                                    buttonStatus,
                                    handleEvaluate,
                                    showEvaluateModal,
                                  }) {
  return (
    <div
      className={ `order-detail-list-item-wrapper ${buttonStatus !== 'disabled' && buttonStatus !== 'select' ? 'selected-order-detail-list-item' : ''}` }>
      <i className="iconfont icon-selected"/>
      <div className="top-part">
        <div className="avatar-wrapper">
          <img src={ avatarSrc || './images/headshot-default.png' } alt="头像" width={ 50 } height={ 50 }/>
          <span className="online-communicate" onClick={ showIMModal }><i
            className="iconfont icon-message"/> 在线沟通</span>
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
          defaultValue={ getRate(score) }
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
          buttonStatus === 'select' && <Button type="primary" onClick={ selectPartyB }>选择Ta</Button>
        }
        {
          buttonStatus === 'disabled' && <Button disabled={ true }>选择Ta</Button>
        }
        {
          buttonStatus === 'cancel' && <Button onClick={ cancelOrder }>取消订单</Button>
        }
        {
          buttonStatus === 'pay' && <Button onClick={ jumpToPay }>立即支付</Button>
        }
        {
          buttonStatus === 'evaluate' && <Button type="primary" onClick={ showEvaluateModal }>立即评价</Button>
        }
        {
          buttonStatus === 'evaluated' && <p>已评价</p>
        }
      </div>
    </div>
  )
}

export { NeedOrderDetailLIstItem as view }
