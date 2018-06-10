import { Icon, Input, message } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { view as IconItem } from '../../components/LogoItem'
import { stateKey } from '../../components/NavMenu'
import { getListServiceByDist, getListServiceByParam, getServiceTree } from '../../service/homepage'
import { view as FirstClass } from './FirstClass'
import './static/style/search.less'

const Search = Input.Search

const mapState = (state) => ({
  cityId: state[ stateKey ].cityId,
  cityName: state[ stateKey ].cityName,
})

@connect(mapState)
class ServiceList extends Component {
  getServiceTree = async () => {
    try {
      const { data: { code, data, desc } } = await getServiceTree({ cityId: this.props.cityId })
      if (code !== 200) {
        message.error(desc)
        return
      }
      console.log('serviceTree', data)
      const firstLevelServiceList = data.map(item => item.serviceTypeName)
      console.log('firstLevelServiceList', firstLevelServiceList)
      console.log('serviceTree', data)
      this.setState({
        serviceTree: data,
        firstLevelServiceList,
      })
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  getFirstServiceList = async () => {
    try {
      const { data: { code, data, desc } } = await getListServiceByParam({
        dist: this.props.cityName,
        level: 'f',
      })
      console.log(code, data, desc)
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  getNearServiceList = async () => {
    try {
      const { data: { code, data, desc } } = await getListServiceByDist({
        dist: this.props.cityName,
        level: 's',
      })
      if (code !== 200) {
        message.error(desc)
        return
      }
      console.log('nearServiceList', data)
      this.setState({
        nearServiceList: data,
      })
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  handleFirstServiceChange = (firstService) => {
    this.setState({
      selectedFirstService: firstService,
      pageState: 'selected',
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      iconListUrl: [
        './images/家政-icon.png',
        './images/美容美甲-icon.png',
        './images/健康-icon.png',
        './images/摄影摄像-icon.png',
        './images/上门维修-icon.png',
        './images/教育培训-icon.png',
        './images/数码维修-icon.png',
        './images/宠物-icon.png',
        './images/活动-icon.png',
        './images/运动健身-icon.png',
        './images/婚礼策划-icon.png',
        './images/其他-icon.png',
      ],
      serviceImageList: [
        './images/美容美甲.png',
        './images/宠物寄养.png',
        './images/保洁.png',
        './images/手机维修.png',
        './images/钟点工.png',
        './images/月嫂.png',
        './images/保姆.png',
        './images/宠物寄养.png',
        './images/宠物训练.png',
        './images/遛狗.png',
        './images/宠物洗澡.png',
      ],
      serviceTree: [],
      firstLevelServiceList: [],
      selectedFirstService: '',
      nearServiceList: [],
    }
  }

  render () {
    const {
      firstLevelServiceList,
      serviceTree,
      serviceImageList,
      selectedFirstService,
    } = this.state
    return (
      <div className="search-service-container">
        <div>
          <i
            className="iconfont icon-logo"
            style={ { fontSize: '40px', lineHeight: '50px' } }
          />
        </div>
        <h1 style={ { marginBottom: '30px' } }>找到所有本地专业服务</h1>
        <Search
          prefix={ <Icon type="search" style={ { fontSize: '18px', color: '#9ca6ae', paddingLeft: '10px' } }/> }
          className="search-input"
          placeholder="试试「小程序开发」"
          enterButton="搜索"
          size="large"
        />
        <div
          className="icon-list-container"
        >
          {
            firstLevelServiceList.map((service, index) =>
              <IconItem
                imgSrc={ this.state.iconListUrl.find(iconUrl => iconUrl.includes(service)) }
                key={ index }
                title={ service }
                handleClick={ () => {this.handleFirstServiceChange(service)} }
              />,
            )
          }
        </div>
        <FirstClass
          selectedFirstService={ selectedFirstService }
          serviceImageList={ serviceImageList }
          secondServiceList={
            (serviceTree.find(item => item.serviceTypeName === selectedFirstService) && (serviceTree.find(item => item.serviceTypeName === selectedFirstService)).child) || []
          }
        />
        <h2 style={ { marginTop: '50px', marginBottom: '20px' } }>如何发布需求</h2>
        <div className="introduce-container">
          <div className="introduce-card">
            <img
              src="./images/home-faqs.png"
              alt="需求问券"
              width={ 120 }
              height={ 120 }
            />
            <h3>回答需求问卷</h3>
            <p>耗时1min左右，需要您简单选择几个问题，以便于服务人员清楚您的需要</p>
          </div>
          <div className="introduce-card">
            <img
              src="./images/home-price.png"
              alt="需求问券"
              width={ 120 }
              height={ 120 }
            />
            <h3>服务人员报价</h3>
            <p>服务人员将根据您的回答响应您的诉求，我们将推荐1位或者更多供您选择</p>
          </div>
          <div className="introduce-card">
            <img
              src="./images/home-onsite.png"
              alt="需求问券"
              width={ 120 }
              height={ 120 }
            />
            <h3>线下享受服务</h3>
            <p>服务人员将上门为您服务，您可为服务的感受和满意程度打分</p>
          </div>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.getServiceTree()
    this.getNearServiceList()
    if (this.props.location.state && this.props.location.state.selectedFirstService) {
      this.setState({
        selectedFirstService: this.props.location.state.selectedFirstService,
      })
    }
  }
}

export { ServiceList as page }
