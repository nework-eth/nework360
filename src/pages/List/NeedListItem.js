import React from 'react'
import { browserHistory } from 'react-router'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

const jumpToProfile = (userId) => () => {
  browserHistory.push({
    pathname: '/profile',
    state: {
      userId,
    },
  })
}

function NeedListItem ({
                         date,
                         title,
                         quotes,
                         status,
                         jumpToPay,
                         hasEvaluated,
                         goNeedDetail,
                         selectedQuote,
                         showEvaluateModal,
                         goNeedOrderDetail,
                         handleChangeDemand,
                         showComplaintModal,
                       }) {
  return (
    <div className="need-list-item-wrapper">
      <div className="need-list-item-title-wrapper">
        <div>
          <span className="need-list-item-title">{ title }</span><span
          className="need-list-item-date">{ date }</span>
        </div>
      </div>
      <div className="need-list-item-content-wrapper">
        <div className="need-list-item-content">
          {
            false && quotes.length ? <span>{ quotes.length }人报价，待选择服务人员</span> : ''
          }
          {
            statusMap[status] === '等待报价' && <span>服务人员估算服务费用中，请耐心等待...</span>
          }
          {
            statusMap[status] === '等待选择服务' && <div className="need-list-avatar-container">
              <div className="need-list-avatar-wrapper">
                {
                  quotes.map(({photo, userId}) =>
                    <img
                      key={ userId }
                      src={ photo || './images/headshot-default.png' }
                      alt="头像"
                      width="50"
                      height="50"
                      style={ {cursor: 'pointer'} }
                      onClick={ jumpToProfile(userId) }
                    />,
                  )
                }
              </div>
              <span style={ {marginLeft: '20px'} }>{ quotes.length }人报价，等待选择服务人员</span>
            </div>
          }
          {
            statusMap[status] === '等待服务' && <div>
              {
                <img
                  src={ selectedQuote.photo || './images/headshot-default.png' }
                  alt="头像"
                  width="50"
                  height="50"
                />
              }
              <span
                style={ {marginLeft: '20px'} }>已选择 { selectedQuote.user && selectedQuote.user.nickname } 服务，等待服务</span>
            </div>
          }
          {
            statusMap[status] === '等待支付' && <div>
              {
                <img
                  src={ selectedQuote.photo || './images/headshot-default.png' }
                  alt="头像"
                  width="50"
                  height="50"
                />
              }
              <span style={ {marginLeft: '20px'} }>服务完成，待支付 { selectedQuote.amount / 100 } 元</span>
            </div>
          }
          {
            statusMap[status] === '支付成功' && <div>
              {
                <img
                  src={ selectedQuote.photo || './images/headshot-default.png' }
                  alt="头像"
                  width="50"
                  height="50"
                />
              }
              <span style={ {marginLeft: '20px'} }>支付完成，已支付 { selectedQuote.amount / 100 } 元</span>
            </div>
          }
        </div>
        <div className="need-list-item-operate">
          {
            statusMap[status] === '等待报价' && <div><span onClick={ handleChangeDemand }>修改需求</span></div>
          }
          {
            statusMap[status] === '等待选择服务' && <div><span onClick={ goNeedOrderDetail }>查看详情</span></div>
          }
          {
            statusMap[status] === '等待服务' && <div><span onClick={ goNeedOrderDetail }>查看详情</span></div>
          }
          {
            statusMap[status] === '等待支付' && <div><span onClick={ jumpToPay }>立即支付</span></div>
          }
          {
            statusMap[status] === '支付成功' && (
              <div><span onClick={ showComplaintModal }
                style={ {paddingRight: '20px'} }>投诉</span>{ !hasEvaluated && <span>|</span> }{ !hasEvaluated && <span
                onClick={ showEvaluateModal }
                style={ {paddingLeft: '20px', paddingRight: '20px'} }>评价</span> }<span>|</span><span
                style={ {paddingLeft: '20px'} } onClick={ goNeedOrderDetail }>查看详情</span>
              </div>)
          }
        </div>
      </div>
    </div>
  )

}

export { NeedListItem as view }