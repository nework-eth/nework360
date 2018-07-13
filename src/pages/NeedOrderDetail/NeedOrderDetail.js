import { message } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { view as Footer } from '../../components/Footer/index.js'
import { IMModal } from '../../components/IMModal/IMModal'
import { cancelOrder, getNeedOrderDetail, getPayInfo, selectPartyB } from '../../service/needOrderDetail/index'
import { getRate } from '../../utils'
import { view as NeedOrderDetailListItem } from './NeedOrderDetailLIstItem'
import './static/style/index.less'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

const generateButtonStatus = (orderStatus, selectedQuoteId, quotedId, quoteStatus) => {
  if (quoteStatus === 2) {
    return 'disabled'
  }
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

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class NeedOrderDetail extends Component {

  state = {
    data: '',
    userB: '',
    quotes: [],
    needsId: this.props.location.state.needsId,
    orderStatus: '',
    IMModalVisible: false,
    selectedQuoteId: '',
  }
  getNeedOrderDetail = async () => {
    const {data: {data, code}} = await getNeedOrderDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        data: data.orders[0],
        quotes: data.orders[0].quotes,
        orderStatus: data.orders[0].status,
        selectedQuoteId: data.orders[0].quoteId,
      })
    }
  }
  selectPartyB = (needsId, quoteId) => async () => {
    const {data: {code}} = await selectPartyB({needsId, quoteId})
    if (code === 200) {
      message.success('成功选择')
      this.getNeedOrderDetail()
    }
  }
  cancelOrder = async () => {
    const {data: {code}} = await cancelOrder({needsId: this.state.needsId})
    if (code === 200) {
      message.success('取消订单成功')
      this.getNeedOrderDetail()
    }
  }

  pay = async () => {
    const {data: {data, code}} = await getPayInfo({channel: 'wx_pub_qr', amount: 200, needsId: '222222'})
    if (code === 200) {
      /* eslint-disable no-undef */
      pingpp.createPayment(data, function (result, err) {
        console.log(result)
        console.log('error', err)
      })
    }
  }

  showIMModal = (userBId) => () => {
    this.setState({
      IMModalVisible: true,
      userB: `${userBId}`,
    })
  }

  hideIMModal = () => {
    this.setState({
      IMModalVisible: false,
      userB: '',
    })
  }

  render () {
    const {
      title,
      userB,
      quotes,
      needsId,
      orderStatus,
      IMModalVisible,
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
                            userId,
                            nickName,
                            hireTimes,
                            creatTime,
                          },
                          photo,
                          status,
                          amount,
                          quoteId,
                        }) =>
              <NeedOrderDetailListItem
                pay={ this.pay }
                key={ quoteId }
                score={ getRate(ave) }
                amount={ amount / 100 }
                nickname={ nickName }
                avatarSrc={ photo }
                hireTimes={ hireTimes }
                scoreCount={ count }
                joinedTime={ creatTime }
                showIMModal={ this.showIMModal(userId) }
                cancelOrder={ this.cancelOrder }
                selectPartyB={ this.selectPartyB(needsId, quoteId) }
                buttonStatus={ generateButtonStatus(orderStatus, selectedQuoteId, quoteId, status) }
              />,
            )
          }
        </main>
        { IMModalVisible && <IMModal
          userA={ this.props.user.userId }
          userB={ 20 }
          visible={ IMModalVisible }
          nickname={ this.props.user.nickName }
          handleCancel={ this.hideIMModal }
        /> }
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getNeedOrderDetail()
  }

}

export { NeedOrderDetail as page }
