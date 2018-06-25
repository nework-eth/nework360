import { Rate } from 'antd'
import React from 'react'

const classNameSpace = 'service-list-item'

function ServiceListItem () {
  return (
    <div className={ `${classNameSpace}-container` }>
      <div className={ `${classNameSpace}-top-wrapper` }>
        <div className="info">
          <span className={ `${classNameSpace}-title` }>深度保洁</span>
          <span className={ `${classNameSpace}-date` }> 时间</span>
        </div>
        <div className={ `${classNameSpace}-operate` }>
          查看需求
        </div>
      </div>
      <div className={ `${classNameSpace}-content-wrapper` }>
        <div className='left'>
          <div className="left-avatar-wrapper">
            <img
              src="http://p66yu2wkf.bkt.clouddn.com/21_avatar__avatar-2.jpg"
              alt="头像"
              width="50"
              height="50"
            />
            <div>在线沟通</div>
          </div>
          <div className="name">
            Rennaiqian
          </div>
          <div className="rate-wrapper">
            <Rate
              allowHalf
              disabled
              defaultValue={ 4.5 }
              character={ <i className="iconfont icon-rate-star-full"/> }
            />
            <p className="rate">{ 4.5 }</p>
            <p className="evaluation">(12条评价)</p>
          </div>
          <div className="date">
            已加入三年两个月
          </div>
        </div>
        <div className='middle'>
          <div className="price">¥ 320</div>
          <div className="tip">我的报价金额</div>
          <p className="information">
            Hi，我常年从事木质地板清洁，在许多知名酒店服务过，经验丰富。您家地板的情况我已查看，我能为您解决，期待为您服务！
          </p>
        </div>
        <div className="right">
          <img
            src="http://p66yu2wkf.bkt.clouddn.com/21_avatar__avatar-2.jpg"
            alt="等待选择"
            width="50"
            height="50"
          />
          <p>
            5人已报价
          </p>
          <p>等待客户选择服务人员</p>
        </div>
        { /*<div className="right">*/ }
        { /*<p>恭喜，您已被选中</p>*/ }
        { /*<Button type="primary">收款</Button>*/ }
        { /*<p className="cancel-order">取消订单</p>*/ }
        { /*</div>*/ }
      </div>
    </div>
  )
}

export { ServiceListItem as view }