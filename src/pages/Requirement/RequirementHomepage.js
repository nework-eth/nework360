import { Button } from 'antd'
import React, { Component } from 'react'
import { view as Footer } from '../../components/Footer'
import './static/style/homepage.less'

class RequirementHomePage extends Component {
  render () {
    return (
      <div className="requirement-homepage-container">
        <main>
          <div className="top-background">
            <div className="top-content">
              <h1>仅需一分钟</h1>
              <h1>即可为您匹配专业的</h1>
              <h1>深度保洁 服务人员</h1>
              <Button type="primary">开始</Button>
              <div className="qa">
                <h3>如何解决您的问题？</h3>
                <div className="tip">
                  <div className="index-item">1</div>
                  <div className="tip-content">
                    <div className="title">回答需求问卷</div>
                    <div>耗时1min左右，需要您简单选择几个问题，以便于服务人员清楚您的需要</div>
                  </div>
                </div>
                <div className="tip">
                  <div className="index-item">2</div>
                  <div className="tip-content">
                    <div className="title">服务人员报价</div>
                    <div>服务人员将根据您的回答响应您的诉求，我们将推荐1位或者更多供您选择</div>
                  </div>
                </div>
                <div className="tip">
                  <div className="index-item">3</div>
                  <div className="tip-content">
                    <div className="title">线下享受服务</div>
                    <div>服务人员将上门为您服务，您可为服务的感受和满意程度打分</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }
}

export { RequirementHomePage as page }