import { message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { ComplaintModal } from '../../components/ComplaintModal/ComplaintModal'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'
import { EvaluateModal } from '../../components/EvaluateModal/EvaluateModal'
import { view as Footer } from '../../components/Footer/index.js'
import { IMModal } from '../../components/IMModal/IMModal'
import { InitiatePaymentModal } from '../../components/InitiatePaymentModal/InitiatePaymentModal'
import {
  cancelServiceOrder,
  deleteServiceOrder,
  evaluate,
  getNeedOrderList,
  getServiceOrderList,
  initiatePayment,
  withdrawServiceOrder,
} from '../../service/list'
import { getUserOnlineStatus } from '../../service/needOrderDetail'
import { getRelativeTime } from '../../utils'
import { view as NeedListItem } from './NeedListItem'
import { view as ServiceListItem } from './ServiceListItem'
import './static/style/index.less'

const formatDate = dateStr => dateStr.replace('-', '年').replace('-', '月').replace(' ', '日 ')

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class List extends Component {

  state = {
    userB: '',
    listType: 'need',
    needLimit: 10,
    needTotal: 0,
    serviceLimit: 10,
    serviceTotal: 0,
    IMModalAvatar: '',
    needOrderList: [],
    IMModalAmount: 0,
    deleteQuoteId: '',
    IMModalVisible: false,
    IMModalNeedsId: '',
    IMModalQuoteId: '',
    evaluateUserId: '',
    evaluateNeedsId: '',
    IMModalNickname: '',
    serviceUserIdArr: [],
    evaluateNickname: '',
    serviceOrderList: [],
    IMModalPhoneNumber: '',
    deleteModalVisible: false,
    evaluateModalVisible: false,
    serviceBadgeStatusArr: [],
    initiatePaymentNeedsId: '',
    complaintModalVisible: false,
    initiatePaymentModalVisible: false,
  }

  getNeedOrderList = async () => {
    try {
      const {data: {data, code, pageinfo}} = await getNeedOrderList({
        limit: this.state.needLimit,
      })
      if (code === 200) {
        this.setState({
          needOrderList: data.orders,
          needTotal: pageinfo.totalCount,
        })
      }
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }
  getServiceOrderList = async () => {
    const {data: {data, code, pageinfo}} = await getServiceOrderList({limit: this.state.serviceLimit})
    if (code === 200) {
      this.setState({
        serviceTotal: pageinfo.totalCount,
        serviceOrderList: data.quotes,
        serviceUserIdArr: data.quotes.map(({user: {userId}}) => userId),
      })
    }
  }
  changeListType = (listType) => () => this.setState({
    listType: listType,
  })
  goNeedOrderDetail = (needsId) => () => browserHistory.push({
    pathname: '/need-order-detail',
    state: {needsId: needsId},
  })
  goNeedDetail = (needsId) => () => {
    browserHistory.push({pathname: '/need-detail', state: {needsId: needsId}})
  }
  cancelServiceOrder = (quoteId) => async () => {
    const {data: {code}} = await cancelServiceOrder({quoteId})
    if (code === 200) {
      message.success('取消服务订单成功')
      this.getServiceOrderList()
    }
  }
  withdrawServiceOrder = (quoteId) => async () => {
    const {data: {code}} = await withdrawServiceOrder({quoteId})
    if (code === 200) {
      message.success('撤销服务订单成功')
      this.getServiceOrderList()
    }
  }
  initiatePayment = (quoteId, amount) => async () => {
    const {data: {code}} = await initiatePayment({quoteId, amount})
    if (code === 200) {
      message.success('发起收款成功')
      this.getServiceOrderList()
    }
  }
  jumpToNeedDetail = (needsId, quoteId, amount) => () => browserHistory.push({
    pathname: '/need-detail',
    state: {needsId, quoteId, amount},
  })
  showComplaintModal = () => this.setState({complaintModalVisible: true})
  showDeleteModal = (quoteId) => () => this.setState({deleteModalVisible: true, deleteQuoteId: quoteId})
  handleDeleteModalCancel = () => this.setState({deleteQuoteId: '', deleteModalVisible: false})
  handleDeleteModalSubmit = async () => {
    const {data: {code}} = await deleteServiceOrder({quoteId: this.state.deleteQuoteId})
    if (code === 200) {
      message.success('删除服务订单成功')
      this.getServiceOrderList()
      this.handleDeleteModalCancel()
    }
  }
  handleComplaintModalCancel = () => this.setState({complaintModalVisible: false})
  showEvaluateModal = (userId, needsId, nickname) => () => this.setState({
    evaluateUserId: userId,
    evaluateNeedsId: needsId,
    evaluateNickname: nickname,
    evaluateModalVisible: true,
  })
  handleEvaluateModalCancel = () => this.setState({
    evaluateUserId: '',
    evaluateNeedsId: '',
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
    }
    this.getServiceOrderList()
    this.handleEvaluateModalCancel()
  }
  showInitiatePaymentModal = (needsId) => () => {
    this.setState({
      initiatePaymentNeedsId: needsId,
      initiatePaymentModalVisible: true,
    })
  }
  handleInitiatePaymentModalCancel = () => this.setState({
    initiatePaymentNeedsId: '',
    initiatePaymentModalVisible: false,
  })
  handleInitiatePaymentModalSubmit = async (amount) => {
    if (amount < 0) {
      message.error('收款金额必须大于0')
      return
    }
    const {data: {code}} = await initiatePayment({needsId: this.state.initiatePaymentNeedsId, amount})
    if (code === 200) {
      message.success('收款成功')
    }
    this.getServiceOrderList()
    this.handleInitiatePaymentModalCancel()
  }
  handleChangeDemand = (needsId, serviceId) => () => browserHistory.push({
    pathname: '/post-demand',
    state: {needsId, serviceId, update: true},
  })
  jumpToPay = ({amount, needsId, userBName}) => () => browserHistory.push({
    pathname: '/pay',
    state: {amount, needsId, userBName},
  })
  loadMoreVisible = () => {
    if (this.state.listType === 'need') {
      return this.state.needLimit < this.state.needTotal
    }
    if (this.state.listType === 'service') {
      return this.state.serviceLimit < this.state.serviceTotal
    }
  }
  loadMore = () => {
    if (this.state.listType === 'need') {
      return this.setState((preState) => (
          {
            needLimit: preState.needLimit + 10,
          }),
        () => this.getNeedOrderList(),
      )
    }
    if (this.state.listType === 'service') {
      return this.setState(
        (preState) => (
          {
            serviceLimit: preState.serviceLimit + 10,
          }
        ),
        () => this.getServiceOrderList(),
      )
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
  polling = () => {
    if (this.state.timerId) {
      return
    }
    const timerId = setInterval(async () => {
      const result = await Promise.all(this.state.serviceUserIdArr.map(userId => getUserOnlineStatus({userId})))
      console.log(result.map(item => item.data.data.online))
      this.setState({
        serviceBadgeStatusArr: result.map(item => item.data.data.online),
      })
    }, 10000)
    this.setState({
      timerId,
    })
  }

  render () {
    const {
      userB,
      listType,
      needOrderList,
      IMModalAvatar,
      IMModalAmount,
      IMModalVisible,
      IMModalNeedsId,
      IMModalQuoteId,
      IMModalNickname,
      serviceOrderList,
      evaluateNickname,
      IMModalPhoneNumber,
      deleteModalVisible,
      evaluateModalVisible,
      serviceBadgeStatusArr,
      complaintModalVisible,
      initiatePaymentModalVisible,
    } = this.state
    return (<div className="list-page-container">
      <main>
        <div className="title-wrapper">
          <h2
            className={ listType === 'need' ? 'checked-title' : '' }
            onClick={ this.changeListType('need') }
          >
            我需求的订单
          </h2>
          { this.props.user.isPartyB && <h2
            className={ listType === 'service' ? 'checked-title' : '' }
            onClick={ this.changeListType('service') }
          >
            我服务的订单
          </h2> }
        </div>
        <div className="content-wrapper">
          {
            listType === 'service' && this.props.user.isPartyB
              ? serviceOrderList.map(({
                                        user: {
                                          // 注意k的大小写
                                          nickName: nickname,
                                          photo,
                                          score,
                                          userId,
                                          // 注意是creatTime
                                          creatTime: userCreateTime,
                                          phoneNum,
                                        },
                                        status: {
                                          status,
                                          count: quoteNumber,
                                          userB: selectedUser,
                                          evaluate: hasEvaluated,
                                        },
                                        amount,
                                        needsId,
                                        quoteId,
                                        updateTime,
                                        serviceName,
                                        instruction,
                                      }, index) =>
                <ServiceListItem
                  key={ quoteId }
                  score={ score ? score.ave : '' }
                  status={ status }
                  userId={ userId }
                  amount={ amount / 100 }
                  quoteId={ quoteId }
                  nickname={ nickname }
                  avatarUrl={ photo }
                  scoreCount={ score ? score.count : 0 }
                  joinedTime={ getRelativeTime(userCreateTime) }
                  updateTime={ formatDate(updateTime) }
                  quoteNumber={ quoteNumber }
                  showIMModal={ this.showIMModal(userId, phoneNum, needsId, quoteId, amount, nickname, photo) }
                  description={ instruction }
                  serviceName={ serviceName }
                  badgeStatus={ serviceBadgeStatusArr[index] }
                  selectedUser={ selectedUser }
                  hasEvaluated={ hasEvaluated === 'yes' }
                  showDeleteModal={ this.showDeleteModal(quoteId) }
                  jumpToNeedDetail={ this.jumpToNeedDetail(needsId, quoteId, amount) }
                  initiatePayment={ this.initiatePayment(quoteId, amount) }
                  showEvaluateModal={ this.showEvaluateModal(userId, needsId, nickname) }
                  cancelServiceOrder={ this.cancelServiceOrder(quoteId) }
                  withdrawServiceOrder={ this.withdrawServiceOrder(quoteId) }
                  showInitiatePaymentModal={ this.showInitiatePaymentModal(needsId) }
                />,
              )
              : needOrderList.map(({
                                     tip,
                                     quotes,
                                     status,
                                     needsId,
                                     quoteId,
                                     userBId,
                                     nickname,
                                     upateTime,
                                     userBName,
                                     serviceId,
                                     serviceName,
                                     amountFinal,
                                   }) =>
                <NeedListItem
                  key={ needsId }
                  date={ formatDate(upateTime) }
                  title={ serviceName }
                  quotes={ quotes }
                  status={ status }
                  jumpToPay={ this.jumpToPay({amount: amountFinal, needsId, userBName}) }
                  goNeedDetail={ this.goNeedDetail(needsId) }
                  selectedQuote={ quotes.find(item => item.quoteId === quoteId) || {} }
                  showEvaluateModal={ this.showEvaluateModal(userBId, needsId, nickname) }
                  goNeedOrderDetail={ this.goNeedOrderDetail(needsId) }
                  showComplaintModal={ this.showComplaintModal }
                  handleChangeDemand={ this.handleChangeDemand(needsId, serviceId) }
                />)
          }
        </div>
        { this.loadMoreVisible() && <div className="list-page-load-more">
          <i className="iconfont icon-load-more" onClick={ this.loadMore }/>
          <span onClick={ this.loadMore }>加载更多</span>
        </div> }
        <ComplaintModal
          visible={ complaintModalVisible }
          handleCancel={ this.handleComplaintModalCancel }
        />
        <EvaluateModal
          visible={ evaluateModalVisible }
          nickname={ evaluateNickname }
          handleCancel={ this.handleEvaluateModalCancel }
          handleSubmit={ this.handleEvaluateModalSubmit }
        />
        <InitiatePaymentModal
          visible={ initiatePaymentModalVisible }
          handleCancel={ this.handleInitiatePaymentModalCancel }
          handleSubmit={ this.handleInitiatePaymentModalSubmit }
        />
        <DeleteModal
          visible={ deleteModalVisible }
          handleCancel={ this.handleDeleteModalCancel }
          handleSubmit={ this.handleDeleteModalSubmit }
        />
        { IMModalVisible && <IMModal
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
        /> }
      </main>
      <Footer/>
    </div>)
  }

  componentDidMount () {
    this.getNeedOrderList()
    this.getServiceOrderList().then(() => this.polling())
    if (this.props.location.state && this.props.location.state.listType) {
      this.setState({
        listType: this.props.location.state.listType,
      })
    }
  }

}

export { List as page }

