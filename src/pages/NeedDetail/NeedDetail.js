import { Button, message, Rate } from 'antd'
import React, { Component } from 'react'
import { QuoteModal } from '../../components/QuoteModal/QuoteModal'
import { createQuote, getNeedDetail } from '../../service/needDetail/index'
import { getRate } from '../../utils'
import { view as NeedDetailItem } from './NeedDetailItem'
import './static/style/index.less'

export const classNameSpace = 'need-detail'

class NeedDetail extends Component {
  state = {
    score: '',
    needsId: '',
    nickName: '',
    avatarSrc: '',
    scoreCount: '',
    serviceName: '',
    quoteModalVisible: false,
    needDetailItemList: [],
  }
  getNeedDetail = async () => {
    const {data: {data, code}} = await getNeedDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        score: data.user.score.ave,
        nickName: data.user.nickName,
        avatarSrc: data.user.photo,
        scoreCount: data.user.score.count,
        serviceName: data.serviceName,
        needDetailItemList: data.needsItem.pages,
      })
    }
  }
  showQuoteModal = () => this.setState({
    quoteModalVisible: true,
  })
  hideQuoteModal = () => {
    this.setState({
      quoteModalVisible: false,
    })
  }
  handleQuoteModalSubmit = (needsId) => async (amount, instruction) => {
    if (!amount) {
      message.error('报价金额不能为空')
      return
    }
    if (typeof amount !== 'number') {
      message.error('报价金额必须为数字')
      return
    }
    const {data: {code}} = await createQuote({needsId, amount, instruction})
    if (code === 200) {
      message.success('报价成功')
      this.getNeedDetail()
      this.hideQuoteModal()
    }
  }

  render () {
    const {
      score,
      needsId,
      nickName,
      avatarSrc,
      scoreCount,
      serviceName,
      quoteModalVisible,
      needDetailItemList,
    } = this.state
    return (
      <div className={ `${classNameSpace}-container` }>
        <main>
          <div className={ `${classNameSpace}-profile` }>
            <img
              src={ avatarSrc || './images/headshot-default.png' }
              alt="头像"
              width="50"
              height="50"
            />
            <div>
              <div className={ `${classNameSpace}-profile-name` }>
                { nickName }
              </div>
              <div className={ `${classNameSpace}-rate-wrapper` }>
                <Rate
                  allowHalf
                  disabled
                  value={ getRate(score) }
                  character={ <i className="iconfont icon-rate-star-full"/> }
                />
                <p className="rate">{ score }</p>
                <p className="evaluation">（{ scoreCount }条评价）</p>
              </div>
            </div>
          </div>
          <h2>Hi，我需要{ serviceName }服务，我的需求如下：</h2>
          {
            needDetailItemList.map((page, index) => <NeedDetailItem data={ page } key={ index }/>)
          }
        </main>
        <QuoteModal
          visible={ quoteModalVisible }
          handleSubmit={ this.handleQuoteModalSubmit(needsId) }
          handleCancel={ this.hideQuoteModal }
        />
        <footer>
          <div/>
          <Button type="primary" onClick={ this.showQuoteModal }>立即报价</Button>
        </footer>
      </div>
    )
  }

  componentDidMount () {
    this.setState({
      needsId: this.props.location.state.needsId,
    }, () => {
      this.getNeedDetail()
    })
  }

}

export { NeedDetail as page }