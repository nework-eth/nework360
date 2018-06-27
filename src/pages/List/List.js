import { message } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { view as Footer } from '../../components/Footer/index.js'
import { getNeedOrderList } from '../../service/list'
import { view as NeedListItem } from './NeedListItem'
import { view as ServiceListItem } from './ServiceListItem'
import './static/style/index.less'

const formatDate = dateStr => dateStr.replace('-', '年').replace('-', '月').replace(' ', '日 ')

class List extends Component {

  state = {
    start: 0,
    limit: 10,
    needOrderList: [],
    serviceOrderList: [ 1 ],
    listType: 'need',
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
      const { data: { data } } = await getNeedOrderList({
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
  goNeedDetail = (needsId) => () => {
    browserHistory.push({ pathname: '/need-detail', state: { needsId: needsId } })
  }

  componentDidMount () {
    this.getNeedOrderList()
  }

  render () {
    const {
      listType,
      needOrderList,
      serviceOrderList,
    } = this.state
    return (<div className="list-page-container">
      <main>
        <div className="title-wrapper">
          <h2 className={ listType === 'need' ? 'checked-title' : '' }>我需求的订单</h2>
          <h2 className={ listType === 'service' ? 'checked-title' : '' }>我服务的订单</h2>
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
                  // imgList={ quotes.map(quote => quote.photo) }
                />)
              : serviceOrderList.map(() =>
                <ServiceListItem/>,
              )
          }
        </div>
      </main>
      <Footer/>
    </div>)
  }
}

export { List as page }

