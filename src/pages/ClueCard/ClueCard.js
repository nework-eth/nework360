import { Button, Input } from 'antd'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer'
import './static/style/index.less'

const classNameSpace = 'clue-card'

class ClueCard extends Component {
  state = {}

  render () {
    return (
      <div className={ `${classNameSpace}-container` }>
        <main>
          <h2>购买线索卡</h2>
          <div className={ `${classNameSpace}-model-wrapper` }>
            <p>剩余 { } 张</p>
          </div>
          <p className={ `${classNameSpace}-virtual-title` }>
            购买数量
          </p>
          <div className={ `${classNameSpace}-input-wrapper` }>
            <Input
              placeholder="请输入10及以上的整数"
            />
            <span className="tip">张</span>
          </div>
          <p className={ `${classNameSpace}-virtual-title` }>
            价格
          </p>
          <div className={ `${classNameSpace}-price` }>
            ¥ 20<span className={ `${classNameSpace}-price-decimal` }>.00</span>
          </div>
          <Button type="primary">
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

  }

}

export { ClueCard as page }
