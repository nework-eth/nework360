import { message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { ComplaintModal } from '../../components/ComplaintModal/ComplaintModal'
import { DeleteModal } from '../../components/DeleteModal/DeleteModal'
import { EvaluateModal } from '../../components/EvaluateModal/EvaluateModal'
import { view as Footer } from '../../components/Footer/index.js'
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
    limit: 10,
    listType: 'service',
    needOrderList: [],
    deleteQuoteId: '',
    evaluateUserId: '',
    evaluateNeedsId: '',
    evaluateNickname: '',
    serviceOrderList: [],
    deleteModalVisible: false,
    evaluateModalVisible: false,
    initiatePaymentQuoteId: '',
    complaintModalVisible: false,
    initiatePaymentModalVisible: false,
  }

  getNeedOrderList = async () => {
    try {
      const {data: {data, code}} = await getNeedOrderList({
        limit: this.state.limit,
      })
      if (code === 200) {
        this.setState({
          needOrderList: data.orders,
        })
      }
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }
  getServiceOrderList = async () => {
    const {data: {data, code}} = await getServiceOrderList()
    if (code === 200) {
      this.setState({serviceOrderList: data.quotes})
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
  jumpToNeedDetail = (needsId) => () => browserHistory.push({pathname: '/need-detail', state: {needsId}})
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
  showInitiatePaymentModal = (quoteId) => () => {
    this.setState({
      initiatePaymentQuoteId: quoteId,
      initiatePaymentModalVisible: true,
    })
  }
  handleInitiatePaymentModalCancel = () => this.setState({
    initiatePaymentQuoteId: '',
    initiatePaymentModalVisible: false,
  })
  handleInitiatePaymentModalSubmit = async (amount) => {
    const {data: {code}} = await initiatePayment({quoteId: this.state.initiatePaymentQuoteId, amount})
    if (code === 200) {
      message.success('收款成功')
    }
    this.handleInitiatePaymentModalCancel()
  }
  handleChangeDemand = (needsId, serviceId) => () => browserHistory.push({
    pathname: '/post-demand',
    state: {needsId, serviceId},
  })
  jumpToPay = ({amount, needsId}) => () => browserHistory.push({pathname: '/pay', state: {amount, needsId}})

  render () {
    const {
      listType,
      deleteQuoteId,
      needOrderList,
      serviceOrderList,
      evaluateNickname,
      deleteModalVisible,
      evaluateModalVisible,
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
          <h2
            className={ listType === 'service' ? 'checked-title' : '' }
            onClick={ this.changeListType('service') }
          >
            我服务的订单
          </h2>
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
                                      }) =>
                <ServiceListItem
                  key={ quoteId }
                  score={ score ? score.ave : '' }
                  status={ status }
                  userId={ userId }
                  amount={ amount / 100 }
                  nickname={ nickname }
                  avatarUrl={ photo }
                  scoreCount={ score ? score.count : 0 }
                  joinedTime={ getRelativeTime(userCreateTime) }
                  updateTime={ formatDate(updateTime) }
                  quoteNumber={ quoteNumber }
                  description={ instruction }
                  serviceName={ serviceName }
                  selectedUser={ selectedUser }
                  hasEvaluated={ hasEvaluated === 'yes' }
                  showDeleteModal={ this.showDeleteModal(quoteId) }
                  jumpToNeedDetail={ this.jumpToNeedDetail(needsId) }
                  initiatePayment={ this.initiatePayment(quoteId, amount) }
                  showEvaluateModal={ this.showEvaluateModal(userId, needsId, nickname) }
                  cancelServiceOrder={ this.cancelServiceOrder(quoteId) }
                  withdrawServiceOrder={ this.withdrawServiceOrder(quoteId) }
                  showInitiatePaymentModal={ this.showInitiatePaymentModal(quoteId) }
                />,
              )
              : needOrderList.map(({
                                     tip,
                                     quotes,
                                     status,
                                     userId,
                                     needsId,
                                     quoteId,
                                     nickname,
                                     upateTime,
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
                  jumpToPay={ this.jumpToPay({amount: amountFinal, needsId}) }
                  goNeedDetail={ this.goNeedDetail(needsId) }
                  selectedQuote={ quotes.find(item => item.quoteId === quoteId) || {} }
                  showEvaluateModal={ this.showEvaluateModal(userId, needsId, nickname) }
                  goNeedOrderDetail={ this.goNeedOrderDetail(needsId) }
                  showComplaintModal={ this.showComplaintModal }
                  handleChangeDemand={ this.handleChangeDemand(needsId, serviceId) }
                />)
          }
        </div>
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
      </main>
      <Footer/>
    </div>)
  }

  componentDidMount () {
    this.getNeedOrderList()
    this.getServiceOrderList()
    if (this.props.location.state && this.props.location.state.listType) {
      this.setState({
        listType: this.props.location.state.listType,
      })
    }
  }

}

export { List as page }

