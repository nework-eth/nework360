import moment from 'moment'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer/index.js'
import { cancelOrder, getNeedOrderDetail, selectPartyB } from '../../service/needOrderDetail/needOrderDetail'
import { view as NeedOrderDetailListItem } from './NeedOrderDetailLIstItem'
import './static/style/index.less'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

const generateButtonStatus = (orderStatus, selectedQuoteId, quotedId) => {
  if (statusMap[orderStatus] === '等待选择服务') {
    return 'select'
  }
  if (selectedQuoteId !== quotedId) {
    return 'disabled'
  }
  if (statusMap[orderStatus] === '等待服务') {
    return 'cancel'
  }
  if (statusMap[orderStatus] === '等待支付') {
    return 'pay'
  }
  if (statusMap[orderStatus] === '支付成功') {
    return 'evaluate'
  }
}

class NeedOrderDetail extends Component {

  state = {
    data: '',
    quotes: [],
    needsId: this.props.location.state ? this.props.location.state.needsId : '201805261855396846258489',
    orderStatus: '',
    selectedQuoteId: '',
  }
  getNeedOrderDetail = async () => {
    const {data: {data}} = await getNeedOrderDetail({needsId: this.state.needsId})
    this.setState({
      data: data.orders[0],
      quotes: data.orders[0].quotes,
      orderStatus: data.orders[0].status,
      selectedQuoteId: data.orders[0].quoteId,
    })
  }
  selectPartyB = (needsId, quoteId) => () => selectPartyB({needsId, quoteId})
  cancelOrder = () => cancelOrder({needsId: '201805261855396846258489'})

  render () {
    const {
      title,
      quotes,
      needsId,
      orderStatus,
      selectedQuoteId,
    } = this.state
    return (
      <div className="order-detail-container">
        <main>
          <div className="order-detail-container-title-wrapper">
            <h2>{ title || '深度保洁' }</h2>
            <div className="date">
              { moment().format('YYYY年MM月DD日 HH:mm') }
            </div>
          </div>
          {
            quotes.map(({
                          user: {
                            score: {
                              ave,
                              count,
                            },
                            nickName,
                            hireTimes,
                            creatTime,
                          },
                          photo,
                          amount,
                          quoteId,
                        }) =>
              <NeedOrderDetailListItem
                score={ ave }
                amount={ amount / 100 }
                nickname={ nickName }
                avatarSrc={ photo }
                hireTimes={ hireTimes }
                scoreCount={ count }
                joinedTime={ creatTime }
                cancelOrder={ cancelOrder }
                selectPartyB={ this.selectPartyB(needsId, quoteId) }
                buttonStatus={ generateButtonStatus(orderStatus, selectedQuoteId, quoteId) }
              />,
            )
          }
        </main>
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getNeedOrderDetail()
  }

}

export { NeedOrderDetail as page }
