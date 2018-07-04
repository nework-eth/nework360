import { message } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ComplaintModal } from '../../components/ComplaintModal/ComplaintModal'
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

class List extends Component {

  state = {
    start: 0,
    limit: 10,
    listType: 'service',
    needOrderList: [],
    evaluateUserId: '',
    evaluateNeedsId: '',
    evaluateNickname: '',
    serviceOrderList: [],
    evaluateModalVisible: false,
    initiatePaymentQuoteId: '',
    complaintModalVisible: false,
    initiatePaymentModalVisible: false,
  }

  getNeedOrderList = async () => {
    try {
      const {data: {data, code}} = await getNeedOrderList({
        start: this.state.start,
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
    console.log('service-order-list', data)
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
    const {data: {data, code}} = await cancelServiceOrder({quoteId})
    //刷新页面
    console.log(code)
  }
  deleteServiceOrder = (quoteId) => async () => {
    const {data: {data, code}} = await deleteServiceOrder({quoteId})
    console.log(code)
  }
  withdrawServiceOrder = (quoteId) => async () => {
    const {data: {data, code}} = await withdrawServiceOrder({quoteId})
    console.log(code)
  }
  initiatePayment = (quoteId, amount) => async () => {
    const {data: {data, code}} = await initiatePayment({quoteId, amount})
    console.log(code)
  }
  showComplaintModal = () => this.setState({complaintModalVisible: true})
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

  render () {
    const {
      listType,
      needOrderList,
      serviceOrderList,
      evaluateNickname,
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
            listType === 'need'
              ? needOrderList.map(({
                                     tip,
                                     quotes,
                                     status,
                                     userId,
                                     needsId,
                                     quoteId,
                                     upateTime,
                                     serviceName,
                                   }) =>
                <NeedListItem
                  key={ needsId }
                  date={ formatDate(upateTime) }
                  title={ serviceName }
                  quotes={ quotes }
                  status={ status }
                  goNeedDetail={ this.goNeedDetail(needsId) }
                  selectedQuote={ quotes.find(item => item.quoteId === quoteId) }
                  goNeedOrderDetail={ this.goNeedOrderDetail }
                  showComplaintModal={ this.showComplaintModal }
                />)
              : serviceOrderList.map(({
                                        user: {
                                          // 注意k的大小写
                                          nickName: nickname,
                                          photo,
                                          score,
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
                                        userId,
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
                  hasEvaluated={ hasEvaluated }
                  initiatePayment={ this.initiatePayment(quoteId, amount) }
                  showEvaluateModal={ this.showEvaluateModal(userId, needsId, nickname) }
                  cancelServiceOrder={ this.cancelServiceOrder(quoteId) }
                  deleteServiceOrder={ this.deleteServiceOrder(quoteId) }
                  withdrawServiceOrder={ this.withdrawServiceOrder(quoteId) }
                  showInitiatePaymentModal={ this.showInitiatePaymentModal(quoteId) }
                />,
              )
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
      </main>
      <Footer/>
    </div>)
  }

  componentDidMount () {
    this.getNeedOrderList()
    this.getServiceOrderList()
  }

}

export { List as page }

