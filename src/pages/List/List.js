import { message } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { ComplaintModal } from '../../components/ComplaintModal/ComplaintModal'
import { EvaluateModal } from '../../components/EvaluateModal/EvaluateModal'
import { view as Footer } from '../../components/Footer/index.js'
import {
  callForPayServiceOrder,
  cancelServiceOrder,
  deleteServiceOrder,
  getNeedOrderList,
  getServiceOrderList,
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
    serviceOrderList: [],
    complaintModalVisible: false,
  }
  getNeedOrderList = async () => {
    try {
      // const { data: { data, code, desc } } = await getNeedOrderList({
      //   start: this.state.start,
      //   limit: this.state.limit,
      // })
      // if (code !== 200) {
      //   message.error(desc)
      //   return
      // }
      const {data: {data}} = await getNeedOrderList({
        start: this.state.start,
        limit: this.state.limit,
      })
      console.log('need-list-data', data)
      this.setState((preState) => ({
        start: preState.start + preState.limit,
        needOrderList: data.orders,
      }))
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }
  getServiceOrderList = async () => {
    const {data: {data}} = await getServiceOrderList()
    console.log('service-order-list', data)
    this.setState({serviceOrderList: data.quotes})
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
  callForPayServiceOrder = (quoteId, amount) => async () => {
    const {data: {data, code}} = await callForPayServiceOrder({quoteId, amount})
    console.log(code)
  }
  handleComplaintModalCancel = () => this.setState({complaintModalVisible: false})
  showComplainModal = () => this.setState({complaintModalVisible: true})

  render () {
    const {
      listType,
      needOrderList,
      serviceOrderList,
      complaintModalVisible,
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
                  showComplaintModal={ this.showComplainModal }
                  // imgList={ quotes.map(quote => quote.photo) }
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
                                        },
                                        amount,
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
                  updateTime={ updateTime }
                  quoteNumber={ quoteNumber }
                  description={ instruction }
                  serviceName={ serviceName }
                  cancelServiceOrder={ this.cancelServiceOrder(quoteId) }
                  deleteServiceOrder={ this.deleteServiceOrder(quoteId) }
                  withdrawServiceOrder={ this.withdrawServiceOrder(quoteId) }
                  callForPayServiceOrder={ this.callForPayServiceOrder(quoteId, amount) }
                />,
              )
          }
        </div>
        <ComplaintModal
          visible={ complaintModalVisible }
          handleCancel={ this.handleComplaintModalCancel }
        />
        <EvaluateModal
          visible={ true }
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

