import { message } from 'antd'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer/index.js'
import { getNeedOrderList } from '../../service/List'
import './static/style/index.less'

class List extends Component {
  state = {
    start: 0,
    limit: 10,
    needOrderList: [],
    listType: 'need',
  }
  getNeedOrderList = async () => {
    try {
      const { data: { data, code, desc } } = await getNeedOrderList({
        start: this.state.start,
        limit: this.state.limit,
      })
      if (code !== 200) {
        message.error(desc)
        return
      }
      this.setState((preState) => ({
        start: preState.start + preState.limit,
        needOrderList: data,
      }))
    } catch (e) {
      message.error('网络连接失败，请检查网络后重试')
    }
  }

  render () {
    const {
      listType,
    } = this.state
    return (<div className="list-page-container">
      <main>
        <div className="title-wrapper">
          <h2 className={ listType === 'need' ? 'checked-title' : '' }>我需求的订单</h2>
          <h2 className={ listType === 'service' ? 'checked-title' : '' }>我服务的订单</h2>
        </div>
      </main>
      <Footer/>
    </div>)
  }

  componentDidMount () {
    this.getNeedOrderList()
  }
}

export { List as page }

