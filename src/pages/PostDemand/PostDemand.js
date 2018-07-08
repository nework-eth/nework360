import { message, Progress } from 'antd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { createDemand, getMatchResult, getTemplate } from '../../service/demand'
import { getNeedDetail } from '../../service/needDetail'
import { view as Footer } from './Footer'
import { MatchResultCardItem } from './MatchResultCardItem'
import './static/style/index.less'
import { view as Template } from './Template'

const filterData = (pageData) => {
  const textArray = pageData.filter((item, index) => index % 2 === 0)
  console.log('textArray', textArray)
  const formItemArray = pageData.filter((item, index) => index % 2 !== 0)
  console.log('formItemArray', formItemArray)
  return formItemArray.map(({
                              id,
                              pageNum,
                              content,
                              isNessary,
                              isMultChoice,
                              templateItemType,
                            }, index) => {
    if (templateItemType === 'select') {
      return {
        id,
        pageNum,
        index: index * 2 + 1,
        options: content,
        type: templateItemType,
        isNecessary: isNessary,
        isMultiChoice: isMultChoice,
        title: textArray[index].content,
      }
    } else {
      return {
        id,
        pageNum,
        index: index * 2 + 1,
        type: templateItemType,
        isNecessary: isNessary,
        isMultiChoice: isMultChoice,
        title: textArray[index].content,
      }
    }
  })
}

const generateResult = (pages) => pages.map(page => page.map(item => ({
  ...item,
  resultValue: generateInitValue(item.templateItemType),
})))

const generateInitValue = (type) => {
  switch (type) {
    case 'select':
      return []
    case 'time':
      return [null]
    default:
      return ''
  }
}

class PostDemand extends Component {

  state = {
    data: [[]],
    pages: [],
    serviceId: '',
    pageIndex: 0,
    originData: [],
    templateId: '',
    serviceName: '',
    progressStep: 0,
    progressPercent: 0,
    locationOptions: [],
    showMatchResult: false,
    matchResultList: [],
  }

  getTemplate = async () => {
    const {data: {data, code}} = await getTemplate({serviceId: this.state.serviceId})
    if (code === 200) {
      this.setState({
        data: generateResult(data.pages),
        pages: data.pages.map(page => filterData(page)),
        templateId: data.templateId,
        progressStep: 100 / data.pages.length,
      })
    }
  }

  goLastPage = () => {
    this.setState(({pageIndex, progressPercent, progressStep}) => ({
      pageIndex: pageIndex - 1,
      progressPercent: progressPercent - progressStep,
    }))
  }

  goNextPage = () => {
    this.setState(({pageIndex, progressPercent, progressStep}) => ({
      pageIndex: pageIndex + 1,
      progressPercent: progressPercent + progressStep,
    }))
  }

  mapInit = () => {
    this.mapApi = new Promise((resolve, reject) => {
      try {
        /* eslint-disable no-undef */
        AMap.plugin('AMap.Autocomplete', () => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  getMatchResult = async () => {
    const {data: {code, data}} = await getMatchResult({userId: 20, serviceId: 10})
    if (code === 200) {
      this.setState({
        matchResultList: data,
      })
    }
  }

  getLocationOptions = keyword => {
    this.mapApi.then(() => {
      /* eslint-disable no-undef */
      this.placeSearch = new AMap.Autocomplete({
        // todo: 去掉假数据
        city: (this.props.user && this.props.user.city) || '北京',
        cityLimit: true,
      })
      keyword && this.placeSearch.search(keyword, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result.tips)
          this.setState({
            locationOptions: result.tips.slice(0, 5),
          })
        }
      })
    })
  }

  createDemand = async () => {
    const {data: {code}} = await createDemand(
      {
        pages: this.state.data,
      },
      {
        // todo: 换成真实数据
        districtId: 110,
        serviceId: 22,
        templateId: this.state.templateId,
      },
    )
    if (code === 200) {
      message.success('发布需求成功')
      this.getMatchResult()
      this.setState({
        showMatchResult: true,
        progressPercent: 100,
      })
    }
  }

  handleGoNextButtonClick = () => {
    if (this.state.pageIndex < this.state.data.length - 1) {
      this.goNextPage()
      return
    }
    this.createDemand()
  }

  handleChange = ({pageNum, index}) => (value) => {
    this.setState(({data}) => {
      data[pageNum][index].resultValue = value
      return {data}
    })
  }

  handleDateChange = ({pageNum, index}) => (value, valueIndex) => {
    this.setState(({data}) => {
      data[pageNum][index].resultValue[valueIndex] = value
      return {data}
    })
  }

  handleLocationChange = ({pageNum, index}) => (value) => {
    this.getLocationOptions(value)
    this.setState(({data}) => {
      const temp = JSON.parse(JSON.stringify(data))
      temp[pageNum][index].resultValue = value
      return {data: temp}
    })
  }

  jumpToProfile = (userId) => () => browserHistory.push({pathname: '/profile', state: {userId}})

  handleSpecAddressChange = ({pageNum, index}) => value => {
    this.setState(({data}) => {
      data[pageNum][index].resultValue = [data[pageNum][index].resultValue.split(',')[0], value].join(',')
      return {data}
    })
  }

  addMoreDay = ({pageNum, index}) => () => {
    this.setState(({data}) => {
      data[pageNum][index].resultValue.push(null)
      return {data}
    })
  }

  handleCompleteButtonClick = () => {
    browserHistory.push({pathname: '/list', state: {listType: 'need'}})
  }

  getNeedDetail = async () => {
    const {data: {data, code}} = await getNeedDetail
    if (code === 200) {
      console.log(data)
    }
  }

  render () {
    const {
      data,
      pages,
      pageIndex,
      serviceName,
      locationOptions,
      progressPercent,
      showMatchResult,
      matchResultList,
    } = this.state
    return (<div className="post-demand-container">
      <main>
        <h2 style={ {margin: '50px 0'} }>
          <i
            className="iconfont icon-logo"
            style={ {fontSize: '30px', lineHeight: '40px'} }
          />
        </h2>
        <Progress
          percent={ progressPercent }
          showInfo={ false }
          style={ {height: '5px'} }
        />
        { !showMatchResult ?
          <div className="template-wrapper">
            {
              pages[pageIndex] && pages[pageIndex].map(item =>
                <Template
                  { ...item }
                  key={ item.id }
                  value={ data[pageIndex][item.index].resultValue }
                  addMoreDay={ this.addMoreDay({pageNum: pageIndex, index: item.index}) }
                  handleChange={ this.handleChange({pageNum: pageIndex, index: item.index}) }
                  locationOptions={ locationOptions }
                  handleDateChange={ this.handleDateChange({pageNum: pageIndex, index: item.index}) }
                  handleLocationChange={ this.handleLocationChange({pageNum: pageIndex, index: item.index}) }
                  handleSpecAddressChange={ this.handleSpecAddressChange({pageNum: pageIndex, index: item.index}) }
                />)
            }
          </div>
          : <div className="match-result-container">
            <h2>已为您匹配到{ matchResultList.length }位{ serviceName }服务人员请耐心等待报价...</h2>
            <div className="match-result-card-item-wrapper">
              {
                matchResultList.map(({userBasicInfoVO}) =>
                  <MatchResultCardItem
                    key={ userBasicInfoVO.userId }
                    avatarSrc={ userBasicInfoVO.avatar }
                    nickname={ userBasicInfoVO.nickname }
                    handleClick={ this.jumpToProfile(userBasicInfoVO.userId) }
                  />,
                )
              }
            </div>
          </div>
        }
      </main>
      <Footer
        complete={ showMatchResult }
        pageData={ data[pageIndex] }
        pageIndex={ pageIndex }
        goLastPage={ this.goLastPage }
        handleGoNextButtonClick={ this.handleGoNextButtonClick }
        handleCompleteButtonClick={ this.handleCompleteButtonClick }
      />
    </div>)
  }

  componentDidMount () {
    this.setState({
      serviceId: this.props.location.state.serviceId,
      serviceName: this.props.location.state.serviceName,
    }, () => {
      this.getTemplate()
      this.mapInit()
      if (this.props.location.state.needsId) {
        this.getNeedDetail()
      }
    })
  }

}

export { PostDemand as page }