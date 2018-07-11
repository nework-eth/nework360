import { Button, Input, message } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { view as Footer } from '../../components/Footer'
import { getClueCardPrice } from '../../service/clueCard'
import { getUserAccount } from '../../service/wallet'
import './static/style/index.less'

const classNameSpace = 'clue-card'

class ClueCard extends Component {
  state = {
    clueCardPrice: 0,
    remainClueCard: 0,
    clueCardCount: '',
  }

  getClueCardPrice = async () => {
    const {data: {culeMoney, code}} = await getClueCardPrice()
    if (code === 200) {
      this.setState({
        clueCardPrice: culeMoney,
      })
    }
  }

  getRemainClueCard = async () => {
    const {data: {data, code}} = await getUserAccount()
    if (code === 200) {
      this.setState({
        remainClueCard: data.cule,
      })
    }
  }

  jumpToPay = () => {
    const clueCardCount = +this.state.clueCardCount
    if (!clueCardCount) {
      message.error('请输入数量')
      return
    }
    if (!Number.isInteger(clueCardCount)) {
      message.error('请输入整数')
      return
    }
    browserHistory.push({
      pathname: '/pay',
      state: {count: this.state.clueCardCount, type: 'clue'},
    })
  }

  render () {
    const {
      clueCardCount,
      clueCardPrice,
      remainClueCard,
    } = this.state
    return (
      <div className={ `${classNameSpace}-container` }>
        <main>
          <h2>购买线索卡</h2>
          <div className={ `${classNameSpace}-model-wrapper` }>
            <p>剩余 { remainClueCard } 张</p>
          </div>
          <p className={ `${classNameSpace}-virtual-title` }>
            购买数量
          </p>
          <div className={ `${classNameSpace}-input-wrapper` }>
            <Input
              type='number'
              placeholder="请输入10及以上的整数"
              value={ clueCardCount }
              onChange={ (e) => {this.setState({clueCardCount: e.target.value})} }
            />
            <span className="tip">张</span>
          </div>
          <p className={ `${classNameSpace}-virtual-title` }>
            价格
          </p>
          <div className={ `${classNameSpace}-price` }>
            ¥ { (+clueCardPrice / 100).toFixed(2).split('.')[0] }<span
            className={ `${classNameSpace}-price-decimal` }>.{ (clueCardPrice / 100).toFixed(2).split('.')[1] }</span>
          </div>
          <Button
            type="primary"
            onClick={ this.jumpToPay }
          >
            立即支付
          </Button>
          <h3>什么是 Nework 线索卡？</h3>
          <div className={ `${classNameSpace}-virtual-li` }>
            <div className={ `${classNameSpace}-virtual-index` }>1</div>
            <span>Nework线索卡用于服务方获取订单线索，针对不同类目所需要的线索卡张数不同；线索卡套餐购买后将自动存入服务方的线索卡账户；</span>
          </div>
          <div className={ `${classNameSpace}-virtual-li` }>
            <div className={ `${classNameSpace}-virtual-index` }>2</div>
            <span>服务方获得订单并报价后自动扣除相应的线索卡张数，若系统判定为虚假甲方/订单，将全部返还服务方支付的线索卡；</span>
          </div>
          <div className={ `${classNameSpace}-virtual-li` }>
            <div className={ `${classNameSpace}-virtual-index` }>3</div>
            <span>线索卡不可退货，随市场价格波动，将永远致力于帮助服务方更低成本的获得订单。</span>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }

  componentDidMount () {
    this.getClueCardPrice()
    this.getRemainClueCard()
  }

}

export { ClueCard as page }
