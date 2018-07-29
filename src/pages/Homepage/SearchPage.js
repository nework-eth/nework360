import { Icon, Input } from 'antd'
import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { view as IconItem } from '../../components/LogoItem'
import { stateKey } from '../../components/NavMenu'
import { getListServiceByDist, getListServiceByParam, getServiceTree } from '../../service/homepage'
import { view as FirstClass } from './FirstClass'
import { view as Home } from './Home'
import './static/style/search.less'

const Search = Input.Search

const mapState = (state) => ({
  cityId: state[stateKey].cityId,
  cityName: state[stateKey].cityName,
})

@connect(mapState)
class SearchPage extends Component {
  handleSearchValueChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
    if (e.target.value) {
      this.getSearchResult(e.target.value)
    } else {
      this.setState({
        searchResult: [],
      })
    }
  }
  getSearchResult = async (serviceName) => {
    const {data: {data, code}} = await getListServiceByParam({
      level: 's',
      serviceName,
      limit: 5,
      dist: this.props.cityName,
    })
    if (code === 200) {
      this.setState({
        searchResult: data,
        searchTipVisible: true,
      })
    }
  }
  getServiceTree = async () => {
    const {data: {data, code}} = await getServiceTree({cityId: this.props.cityId})
    if (code === 200) {
      const firstLevelServiceList = data.map(item => item.serviceTypeName)
      this.setState({
        serviceTree: data,
        firstLevelServiceList,
      })
    }
  }

  handleFirstServiceChange = (firstService) => browserHistory.push({
    pathname: '/service-list',
    state: {selectedFirstService: firstService},
  })

  getNearServiceList = async () => {
    const {data: {data}} = await getListServiceByDist({
      dist: this.props.cityName,
      level: 's',
    })
    this.setState({
      nearServiceList: data,
    })
  }

  getFirstServiceList = async () => {
    getListServiceByParam({
      dist: this.props.cityName,
      level: 'f',
    })
  }

  handleSearchTipClick = (serviceName, serviceTypeId) => () => {
    this.setState({
      searchValue: serviceName,
      searchTipVisible: false,
      selectedServiceTypeId: serviceTypeId,
    })
  }

  handleSearchButtonClick = () => {
    const searchItem = this.state.searchResult.find(({serviceTypeName}) => serviceTypeName === this.state.searchValue)
    if (searchItem) {
      browserHistory.push({
        pathname: '/requirement-homepage', state: {
          serviceName: this.state.searchValue,
          serviceId: searchItem.serviceTypeId,
        },
      })
    }
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
      pageState: 'default',
      selectedFirstService: '',
      nearServiceList: [],
      searchValue: '',
      searchResult: [],
      searchTipVisible: false,
      selectedServiceTypeId: '',
    }
    this.getSearchResult = debounce(this.getSearchResult, 500)
  }

  componentDidMount () {
    this.getServiceTree()
    this.getNearServiceList()
  }

  virtualRouter = () => {
    const {
      pageState,
      serviceTree,
      serviceImageList,
      selectedFirstService,
    } = this.state
    if (pageState === 'default') {

    }
    return <FirstClass
      selectedFirstService={ selectedFirstService }
      serviceImageList={ serviceImageList }
      secondServiceList={ (serviceTree.find(item => item.serviceTypeName === selectedFirstService)).child }
    />
  }
  jumpToRequirement = ({serviceTypeId, serviceTypeName}) => () => {
    browserHistory.push({
      pathname: '/requirement-homepage',
      state: {
        serviceId: serviceTypeId,
        serviceName: serviceTypeName,
      },
    })
  }

  render () {
    const {
      searchValue,
      serviceTree,
      searchResult,
      nearServiceList,
      serviceImageList,
      searchTipVisible,
      firstLevelServiceList,
    } = this.state
    return (
      <div className="search-service-container">
        <div>
          <i
            className="iconfont icon-logo"
            style={ {fontSize: '40px', lineHeight: '50px'} }
          />
        </div>
        <h1 style={ {marginBottom: '30px'} }>找到所有本地专业服务</h1>
        <div className="search-input-container">
          <Search
            prefix={ <Icon type="search" style={ {fontSize: '18px', color: '#9ca6ae', paddingLeft: '10px'} }/> }
            className="search-input"
            placeholder="试试「小程序开发」"
            enterButton="搜索"
            size="large"
            value={ searchValue }
            onChange={ this.handleSearchValueChange }
            onSearch={ this.handleSearchButtonClick }
          />
          { searchTipVisible && searchValue && <div className="search-input-tip-wrapper">
            { searchResult.length
              ? searchResult.map(({serviceTypeName, serviceTypeId}) =>
                <div
                  key={ serviceTypeId }
                  className="search-input-tip-item"
                  onClick={ this.handleSearchTipClick(serviceTypeName, serviceTypeId) }
                >
                  { serviceTypeName }
                </div>,
              )
              : <div className="search-input-tip-item">没有找到相关的搜索结果，请重新输入</div>
            }
          </div> }
        </div>
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
        <Home
          firstServiceList={ firstLevelServiceList }
          serviceTree={ serviceTree }
          nearServiceList={ nearServiceList }
          serviceImageList={ serviceImageList }
          handleFirstServiceChange={ this.handleFirstServiceChange }
          jumpToRequirement={ this.jumpToRequirement }
        />
        <h2 style={ {marginTop: '50px', marginBottom: '20px'} }>如何发布需求</h2>
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
}

export { SearchPage as page }
