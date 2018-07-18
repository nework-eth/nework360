import { message } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { EvaluateModal } from '../../components/EvaluateModal/EvaluateModal'
import { view as Footer } from '../../components/Footer/index.js'
import { IMModal } from '../../components/IMModal/IMModal'
import { evaluate } from '../../service/list'
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
    title: '',
    quotes: [],
    needsId: this.props.location.state.needsId,
    orderStatus: '',
    IMModalAvatar: '',
    IMModalAmount: '',
    IMModalNeedsId: '',
    IMModalQuoteId: '',
    IMModalVisible: false,
    IMModalNickname: '',
    selectedQuoteId: '',
    evaluateNickname: '',
    IMModalPhoneNumber: '',
    evaluateModalVisible: false,
  }
  getNeedOrderDetail = async () => {
    const {data: {data, code}} = await getNeedOrderDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        data: data.orders[0],
        title: data.orders[0].serviceName,
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
        if (err) {
          console.log('error', err)
        }
      })
    }
  }

  showIMModal = (userBId, IMModalPhoneNumber, IMModalNeedsId, IMModalQuoteId, IMModalAmount, IMModalNickname, IMModalAvatar) => () => {
    this.setState({
      userB: `${userBId}`,
      IMModalAmount,
      IMModalAvatar,
      IMModalVisible: true,
      IMModalNeedsId,
      IMModalQuoteId,
      IMModalNickname,
      IMModalPhoneNumber,
    })
  }

  hideIMModal = () => {
    this.setState({
      userB: '',
      IMModalAmount: '',
      IMModalAvatar: '',
      IMModalVisible: false,
      IMModalNeedsId: '',
      IMModalQuoteId: '',
      IMModalNickname: '',
      IMModalPhoneNumber: '',
    })
  }

  showEvaluateModal = (userId, needsId, evaluateNickname) => () => this.setState({
    evaluateUserId: userId,
    evaluateNeedsId: needsId,
    evaluateNickname,
    evaluateModalVisible: true,
  })

  handleEvaluateModalCancel = () => this.setState({
    evaluateNickname: '',
    evaluateModalVisible: false,
  })

  handleEvaluateModalSubmit = async (score, content) => {
    if (!score) {
      message.error('请选择评分')
      return
    }
    const {data: {code}} = await evaluate({
      userId: this.state.evaluateUserId,
      needsId: this.state.evaluateNeedsId,
      score,
      content,
    })
    if (code === 200) {
      message.success('评价成功')
      this.getNeedOrderDetail()
    }
    this.handleEvaluateModalCancel()
  }

  jumpToPay = ({amount, needsId, userBName}) => () => browserHistory.push({
    pathname: '/pay',
    state: {amount, needsId, userBName},
  })

  render () {
    const {
      title,
      userB,
      quotes,
      needsId,
      orderStatus,
      IMModalAvatar,
      IMModalAmount,
      IMModalNeedsId,
      IMModalQuoteId,
      IMModalVisible,
      selectedQuoteId,
      IMModalNickname,
      evaluateNickname,
      IMModalPhoneNumber,
      evaluateModalVisible,
    } = this.state
    return (
      <div className="order-detail-container">
        <main>
          <div className="order-detail-container-title-wrapper">
            <h2>{ title }</h2>
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
                            phoneNum,
                            hireTimes,
                            creatTime,
                          },
                          photo,
                          status,
                          amount,
                          quoteId,
                        }) =>
              <NeedOrderDetailListItem
                key={ quoteId }
                score={ getRate(ave) }
                amount={ amount / 100 }
                nickname={ nickName }
                jumpToPay={ this.jumpToPay({amount, needsId, userBName: nickName}) }
                avatarSrc={ photo }
                hireTimes={ hireTimes }
                scoreCount={ count }
                joinedTime={ creatTime }
                showIMModal={ this.showIMModal(userId, phoneNum, needsId, quoteId, amount, nickName, photo) }
                cancelOrder={ this.cancelOrder }
                selectPartyB={ this.selectPartyB(needsId, quoteId) }
                buttonStatus={ generateButtonStatus(orderStatus, selectedQuoteId, quoteId, status) }
                showEvaluateModal={ this.showEvaluateModal(userId, needsId, nickName) }
              />,
            )
          }
        </main>
        {
          IMModalVisible &&
          <IMModal
            userA={ this.props.user.userId }
            userB={ userB }
            amount={ IMModalAmount }
            needsId={ IMModalNeedsId }
            quoteId={ IMModalQuoteId }
            visible={ IMModalVisible }
            nickname={ IMModalNickname }
            avatarUrl={ IMModalAvatar }
            phoneNumber={ IMModalPhoneNumber }
            handleCancel={ this.hideIMModal }
          />
        }
        <EvaluateModal
          visible={ evaluateModalVisible }
          nickname={ evaluateNickname }
          handleCancel={ this.handleEvaluateModalCancel }
          handleSubmit={ this.handleEvaluateModalSubmit }
        />
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getNeedOrderDetail()
  }

}

export { NeedOrderDetail as page }
