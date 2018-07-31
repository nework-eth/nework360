import { Button, message, Rate } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { QuoteModal } from '../../components/QuoteModal/QuoteModal'
import { TipModal } from '../../components/TipModal/TipModal'
import { getClueCount } from '../../service/clueCard'
import { createQuote, getNeedDetail, withdrawQuote } from '../../service/needDetail/index'
import { getUserAccount } from '../../service/wallet'
import { getRate } from '../../utils'
import { view as NeedDetailItem } from './NeedDetailItem'
import './static/style/index.less'

export const classNameSpace = 'need-detail'

const mapState = (state) => ({
  user: state.user,
})

@connect(mapState)
class NeedDetail extends Component {
  state = {
    score: '',
    cancel: '',
    userId: '',
    needsId: '',
    nickName: '',
    clueCount: 0,
    hasQuoted: true,
    serviceId: '',
    avatarSrc: '',
    scoreCount: '',
    serviceName: '',
    clueCardCount: 0,
    tipModalVisible: false,
    quoteModalVisible: false,
    needDetailItemList: [],
  }
  getNeedDetail = async () => {
    const {data: {data, code}} = await getNeedDetail({needsId: this.state.needsId})
    if (code === 200) {
      this.setState({
        score: data.user.score.ave,
        amount: data.amount,
        cancel: data.cancel,
        userId: data.user.userId,
        nickName: data.user.nickName,
        hasQuoted: data.quote === 'yes',
        serviceId: data.serviceId,
        avatarSrc: data.user.photo,
        scoreCount: data.user.score.count,
        serviceName: data.serviceName,
        needDetailItemList: data.needsItem.pages,
      })
    }
    this.getClueCount()
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
    if (+amount <= 0) {
      message.error('报价金额不能小于0')
      return
    }
    if (Number.isNaN(+amount)) {
      message.error('报价金额必须为数字')
      return
    }
    const res = await getUserAccount({userId: this.props.user.userId})
    if (res.data.code !== 200) {
      return
    }
    if (res.data.data.cule < 5) {
      return this.showTipModal(res.data.data.cule)
    }
    const {data: {code, quoteId}} = await createQuote({needsId, amount: amount * 100, instruction})
    if (code === 200) {
      message.success('报价成功')
      this.props.location.state = Object.assign({}, this.props.location.state, {amount: amount * 100, quoteId})
      this.getNeedDetail()
      this.hideQuoteModal()
    }
  }
  showTipModal = (count) => {
    this.setState({
      clueCardCount: count,
      tipModalVisible: true,
    })
  }
  withdrawQuote = async () => {
    const {data: {code}} = await withdrawQuote({quoteId: this.props.location.state.quoteId})
    if (code === 200) {
      message.success('取消报价成功')
      this.getNeedDetail()
    }
  }
  handleConfirm = () => browserHistory.push('/clue-card')
  handleTipModalCancel = () => this.setState({
    tipModalVisible: false,
  })
  jumpToProfile = (userId) => () => {
    browserHistory.push({
      pathname: '/profile',
      state: {
        userId,
      },
    })
  }

  getClueCount = async () => {
    const {data: {code, culeCount}} = await getClueCount({serviceId: this.state.serviceId})
    if (code === 200) {
      this.setState({
        clueCount: culeCount,
      })
    }
  }

  componentDidMount () {
    this.setState({
      needsId: this.props.location.state.needsId,
    }, () => {
      this.getNeedDetail()
    })
  }

  render () {
    const {
      score,
      cancel,
      userId,
      needsId,
      nickName,
      serviceId,
      hasQuoted,
      avatarSrc,
      clueCount,
      scoreCount,
      serviceName,
      clueCardCount,
      tipModalVisible,
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
              style={ {cursor: 'pointer'} }
              onClick={ this.jumpToProfile(userId) }
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
          needsId={ needsId }
          clueCount={ clueCount }
          handleSubmit={ this.handleQuoteModalSubmit(needsId) }
          handleCancel={ this.hideQuoteModal }
        />
        <TipModal
          count={ clueCardCount }
          clueCount={ clueCount }
          visible={ tipModalVisible }
          handleConfirm={ this.handleConfirm }
          handleCancel={ this.handleTipModalCancel }
        />
        { +userId !== +this.props.user.userId && <footer>
          <div>{ hasQuoted && <div>
            <p
              className="quote-amount">¥ { ((this.props.location.state.amountFinal && this.props.location.state.amountFinal / 100) || this.state.amount / 100).toFixed(2) }</p>
            <p className="quote-amount-tip">您的报价</p>
          </div> }</div>
          {
            !hasQuoted && <Button type="primary" onClick={ this.showQuoteModal }>立即报价</Button>
          }
          {
            cancel === 'yes' && <Button onClick={ this.withdrawQuote }>取消报价</Button>
          }
          {
            cancel === 'already' && <Button disabled>已取消报价</Button>
          }
        </footer> }
      </div>
    )
  }

}

export { NeedDetail as page }