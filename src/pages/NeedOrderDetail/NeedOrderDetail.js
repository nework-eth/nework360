import { message } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { EvaluateModal } from '../../components/EvaluateModal/EvaluateModal'
import { view as Footer } from '../../components/Footer/index.js'
import { IMModal } from '../../components/IMModal/IMModal'
import { evaluate } from '../../service/list'
import {
  cancelOrder,
  getNeedOrderDetail,
  getUserOnlineStatus,
  selectPartyB,
} from '../../service/needOrderDetail/index'
import { getRate, getRelativeTime } from '../../utils'
import { view as NeedOrderDetailListItem } from './NeedOrderDetailLIstItem'
import './static/style/index.less'

const statusMap = {
  2: '等待报价',
  6: '等待选择服务',
  30: '等待服务',
  210: '等待支付',
  2310: '支付成功',
}

const generateButtonStatus = (orderStatus, selectedQuoteId, quotedId, quoteStatus, hasEvaluated) => {
  if (quoteStatus === 2 || quoteStatus === 3 || quoteStatus === 4 || quoteStatus === 0) {
    return 'disabled'
  }
  if (statusMap[orderStatus] === '等待选择服务') {
    return 'select'
  }
  if (selectedQuoteId !== quotedId) {
    return 'disabled'
  }
  if (hasEvaluated) {
    return 'evaluated'
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
    timerId: '',
    needsId: this.props.location.state.needsId,
    userIdArr: [],
    amountFinal: '',
    orderStatus: '',
    hasEvaluated: '',
    IMModalAvatar: '',
    IMModalAmount: '',
    badgeStatusArr: [],
    IMModalNeedsId: '',
    IMModalQuoteId: '',
    IMModalVisible: false,
    IMModalNickname: '',
    selectedQuoteId: '',
    evaluateNickname: '',
    IMModalPhoneNumber: '',
    IMModalServiceName: '',
    IMModalInstruction: '',
    evaluateModalVisible: false,
  }

  getNeedOrderDetail = async () => {
    const {data: {data, code}} = await getNeedOrderDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        data: data.orders[0],
        title: data.orders[0].serviceName,
        quotes: data.orders[0].quotes,
        userIdArr: data.orders[0].quotes.map(({user: {userId}}) => userId),
        amountFinal: data.orders[0].amountFinal,
        orderStatus: data.orders[0].status,
        hasEvaluated: data.orders[0].evaluate === 'yes',
        selectedQuoteId: data.orders[0].quoteId,
      })
      this.polling()
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

  showIMModal = (
    userBId,
    IMModalPhoneNumber,
    IMModalNeedsId,
    IMModalQuoteId,
    IMModalAmount,
    IMModalNickname,
    IMModalAvatar,
    IMModalServiceName,
    IMModalInstruction,
  ) => () => {
    this.setState({
      userB: `${userBId}`,
      IMModalAmount,
      IMModalAvatar,
      IMModalVisible: true,
      IMModalNeedsId,
      IMModalQuoteId,
      IMModalNickname,
      IMModalPhoneNumber,
      IMModalServiceName,
      IMModalInstruction,
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
      IMModalServiceName: '',
      IMModalInstruction: '',
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
  polling = async () => {
    if (this.state.timerId) {
      return
    }
    const timerId = setInterval(async () => {
      const result = await Promise.all(this.state.userIdArr.map(userId => getUserOnlineStatus({userId})))
      this.setState({
        badgeStatusArr: result.map(item => item.data.data.online),
      })
    }, 10000)
    const result = await Promise.all(this.state.userIdArr.map(userId => getUserOnlineStatus({userId})))
    this.setState({
      badgeStatusArr: result.map(item => item.data.data.online),
    })
    this.setState({
      timerId,
    })
  }

  componentDidMount () {
    this.getNeedOrderDetail()
  }

  render () {
    const {
      title,
      userB,
      quotes,
      needsId,
      amountFinal,
      orderStatus,
      hasEvaluated,
      IMModalAvatar,
      IMModalAmount,
      badgeStatusArr,
      IMModalNeedsId,
      IMModalQuoteId,
      IMModalVisible,
      selectedQuoteId,
      IMModalNickname,
      evaluateNickname,
      IMModalPhoneNumber,
      IMModalServiceName,
      IMModalInstruction,
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
                            score,
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
                          instruction,
                        }, index) =>
              <NeedOrderDetailListItem
                key={ quoteId }
                score={ getRate(score ? score.ave : 0) }
                amount={ amount / 100 }
                nickname={ nickName }
                jumpToPay={ this.jumpToPay({amount, needsId, userBName: nickName}) }
                avatarSrc={ photo }
                hireTimes={ hireTimes }
                amountFinal={ amountFinal / 100 }
                scoreCount={ score ? score.count : 0 }
                joinedTime={ getRelativeTime(creatTime) }
                badgeStatus={ badgeStatusArr[index] }
                showIMModal={ this.showIMModal(userId, phoneNum, needsId, quoteId, amount, nickName, photo, this.state.title, instruction) }
                cancelOrder={ this.cancelOrder }
                selectPartyB={ this.selectPartyB(needsId, quoteId) }
                buttonStatus={ generateButtonStatus(orderStatus, selectedQuoteId, quoteId, status, hasEvaluated) }
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
            serviceName={ IMModalServiceName }
            instruction={ IMModalInstruction }
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

  componentWillUnmount () {
    if (this.state.timerId) {
      clearInterval(this.state.timerId)
      this.setState({
        timerId: '',
      })
    }
  }

}

export { NeedOrderDetail as page }
