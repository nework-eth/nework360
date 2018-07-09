import React from 'react'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

function NeedListItem ({
                         date,
                         title,
                         quotes,
                         status,
                         jumpToPay,
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
            statusMap[status] === '等待选择服务' && <div>
              {
                quotes.map(({photo, userId}) =>
                  <img
                    key={ userId }
                    src={ photo || './images/headshot-default.png' }
                    alt="头像"
                    width="50"
                    height="50"
                  />,
                )
              }
              <span>{ quotes.length }人报价，等待服务人员</span>
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
              <span>已选择 { selectedQuote.nickName } 服务，等待服务</span>
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
              <span>服务完成，待支付 { selectedQuote.amount / 100 } 元</span>
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
              <span>支付完成，已支付 { selectedQuote.amount / 100 } 元</span>
            </div>
          }
        </div>
        <div className="need-list-item-operate">
          {
            statusMap[status] === '等待报价' && <div><span onClick={ handleChangeDemand }>修改需求</span></div>
          }
          {
            statusMap[status] === '等待选择' && <div><span onClick={ goNeedDetail }>查看详情</span></div>
          }
          {
            statusMap[status] === '等待服务' && <div><span onClick={ goNeedOrderDetail }>查看详情</span></div>
          }
          {
            statusMap[status] === '等待支付' && <div><span onClick={ jumpToPay }>立即支付</span></div>
          }
          {
            statusMap[status] === '支付成功' && (
              <div><span onClick={ showComplaintModal } style={ {paddingRight: '20px'} }>投诉</span><span>|</span><span
                onClick={ showEvaluateModal }
                style={ {paddingLeft: '20px', paddingRight: '20px'} }>评价</span><span>|</span><span
                style={ {paddingLeft: '20px'} } onClick={ goNeedDetail }>查看详情</span>
              </div>)
          }
        </div>
      </div>
    </div>
  )

}

export { NeedListItem as view }