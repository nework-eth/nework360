import { Button, Input, message, Progress, Select } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { setUser } from '../../components/NavMenu/actions'
import { appointment, createDemand, getMatchResult, getTemplate, updateDemand } from '../../service/demand'
import { getUserById, updateUser } from '../../service/editData'
import { getCityTree } from '../../service/homepage'
import { getNeedDetail } from '../../service/needDetail'
import { view as Footer } from './Footer'
import { MatchResultCardItem } from './MatchResultCardItem'
import './static/style/index.less'
import { view as Template } from './Template'

const {Option} = Select

const filterData = (pageData) => {
  const textArray = pageData.filter((item, index) => index % 2 === 0)
  const formItemArray = pageData.filter((item, index) => index % 2 !== 0)
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

const filterEditData = (editData) => editData.map(page => {
  page.forEach(item => {
    if (item.templateItemType === 'time') {
      item.resultValue = item.resultValue.map(timeStr => moment(timeStr))
    }
  })
  return page
})

const mapState = (state) => ({
  user: state.user,
  position: state.position,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setUser,
}, dispatch)

@connect(mapState, mapDispatch)
class PostDemand extends Component {

  state = {
    data: [[]],
    pages: [],
    cityId: '',
    latitude: '',
    cityData: [],
    location: '',
    specAddr: '',
    longitude: '',
    serviceId: '',
    pageIndex: 0,
    originData: [],
    templateId: '',
    serviceName: '',
    cityOptions: [],
    progressStep: 0,
    selectedCity: undefined,
    countryOptions: [],
    provinceOptions: [],
    specAddrTooLong: false,
    selectedCountry: '中国',
    progressPercent: 0,
    locationOptions: [],
    showMatchResult: false,
    matchResultList: [],
    selectedProvince: undefined,
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
          AMap.plugin('AMap.Geocoder', () => {
            resolve()
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  getMatchResult = async (needsId) => {
    const {data: {code, data}} = await getMatchResult({
      userId: this.props.user.userId,
      serviceId: this.state.serviceId,
      needsId: this.props.location.state.needsId || needsId,
    })
    if (code === 200) {
      this.setState({
        matchResultList: data,
      })
    }
  }

  appointment = async (needsId) => {
    const {data: {data, code}} = await appointment({
      userId: this.props.user.userId,
      needsId,
      serviceId: this.state.serviceId,
      skillUserId: this.props.location.state.partyBId,
    })
    if (code === 200) {
      this.setState({
        matchResultList: [data],
      })
    }
  }

  getLocationOptions = keyword => {
    this.mapApi.then(() => {
      /* eslint-disable no-undef */
      this.placeSearch = new AMap.Autocomplete({
        city: this.props.position.cityName,
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
    if (this.props.location.state && this.props.location.state.update) {
      const {data: {code}} = await updateDemand(
        {
          pages: this.state.data,
        },
        {
          needsId: this.props.location.state.needsId,
          districtId: this.props.position.cityId,
          serviceId: this.state.serviceId,
          templateId: this.state.templateId,
        },
      )
      if (code === 200) {
        message.success('更新需求成功')
        await this.getMatchResult()
        this.setState({
          showMatchResult: true,
          progressPercent: 100,
        })
      }
    } else {
      const {data: {code, needsId}} = await createDemand(
        {
          pages: this.state.data,
        },
        {
          districtId: this.props.position.cityId,
          serviceId: this.state.serviceId,
          templateId: this.state.templateId,
        },
      )
      if (code === 200) {
        message.success('发布需求成功')
        if (this.props.location.state && this.props.location.state.partyBId) {
          console.log('here')
          await this.appointment(needsId)
          this.setState({
            showMatchResult: true,
            progressPercent: 100,
          })
        } else {
          await this.getMatchResult(needsId)
          this.setState({
            showMatchResult: true,
            progressPercent: 100,
          })
        }
      }
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

  getNeedDetail = async (needsId) => {
    const {data: {data, code}} = await getNeedDetail({needsId})
    if (code === 200) {
      this.setState({data: filterEditData(data.needsItem.pages)})
    }
  }
  getCityTree = async () => {
    const {data: {data}} = await getCityTree()
    const tree = data
    const countryList = Object.keys(tree)
    const provinceList = Object.keys(tree['中国'])
    const letterCityList = tree['中国']['北京'].map(item => item.chinese)
    this.setState({
      tree,
      countryOptions: countryList,
      provinceOptions: provinceList,
      cityOptions: letterCityList,
      cityData: tree['中国']['北京'],
    })
  }
  handleCountryChange = (value) => {
    const provinceOptions = Object.keys(this.state.tree[value])
    const selectedProvince = provinceOptions[0]
    console.log(provinceOptions)
    const cityData = this.state.tree[value][selectedProvince]
    const cityOptions = cityData.map(item => item.chinese)
    const selectedCity = cityOptions[0]
    this.setState({
      selectedCountry: value,
      provinceOptions,
      selectedProvince: undefined,
      cityData,
      cityOptions,
      selectedCity: undefined,
      cityId: (cityData.find(item => item.chinese === selectedCity)).districtId,
      location: '',
      specAddr: '',
    })
  }
  handleProvinceChange = (value) => {
    console.log(this.state.tree[this.state.selectedCountry][value])
    const cityData = this.state.tree[this.state.selectedCountry][value]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedProvince: value,
      cityData,
      cityOptions,
      selectedCity: undefined,
      cityId: (cityData.find(item => item.chinese === cityOptions[0])).districtId,
      location: '',
      specAddr: '',
    })
  }
  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
      cityId: (this.state.cityData.find(item => item.chinese === value)).districtId,
      location: '',
      specAddr: '',
    })
  }
  handleSpecAddrChange = (e) => {
    let str = e.target.value
    if (str.length > 100) {
      str = str.slice(0, 100)
      this.setState({
        specAddrTooLong: true,
      })
    } else if (this.state.specAddrTooLong) {
      this.setState({
        specAddrTooLong: false,
      })
    }
    this.setState({
      specAddr: str,
    })
  }
  handleServiceLocationChange = (value) => {
    // console.log('change')
    this.getLocationOptions(value)
    this.setState({
      location: value,
    })
  }
  handleSubmit = () => {
    this.geoCoder([this.updateUserPosition])
  }
  updateUserPosition = async () => {
    const {data: {code}} = await updateUser({
      userId: this.props.user.userId,
      latitude: this.state.latitude,
      district: this.state.cityId,
      longitude: this.state.longitude,
      location: this.state.location,
      specAddr: this.state.specAddr,
    })
    if (code === 200) {
      message.success('提交服务位置成功')
      const {data: {data, code}} = await getUserById({userId: this.props.user.userId})
      if (code === 200) {
        this.props.setUser(data)
      }
    }
  }
  geoCoder = (cbArr) => {
    this.mapApi.then(() => {
      /* eslint-disable no-undef */
      const geocoder = new AMap.Geocoder({
        city: this.state.selectedCity,
      })
      //地理编码,返回地理编码结果
      geocoder.getLocation(`${this.state.location} ${this.state.specAddr}`, (status, result) => {
        if (status === 'complete' && result.info === 'OK' && result.geocodes.length === 1) {
          this.setState({
            latitude: result.geocodes[0].location.lat,
            longitude: result.geocodes[0].location.lng,
          })
          cbArr.forEach(item => item())
          return
        }
        message.error('地址位置不够精确，请确保你所添加的信息是正确的')
      })
    })
  }

  render () {
    const {
      data,
      pages,
      specAddr,
      location,
      pageIndex,
      serviceId,
      cityOptions,
      serviceName,
      selectedCity,
      countryOptions,
      provinceOptions,
      selectedCountry,
      locationOptions,
      progressPercent,
      showMatchResult,
      matchResultList,
      specAddrTooLong,
      selectedProvince,
    } = this.state
    return (<div className="post-demand-container">
      {
        this.props.user.latitude ? <div className="content-wrapper">
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
        </div> : <div className="content-wrapper">
          <main>
            <h2 style={ {margin: '50px 0'} }>
              <i
                className="iconfont icon-logo"
                style={ {fontSize: '30px', lineHeight: '40px'} }
              />
            </h2>
            <div className="service-location-container">
              <h2 style={ {
                marginBottom: '50px',
              } }>请选择您需要服务的位置</h2>
              <div className="select-container">
                <div className="select-wrapper">
                  <p>国家或地区</p>
                  <Select
                    className="skill-select-item"
                    value={ selectedCountry }
                    onChange={ this.handleCountryChange }
                    placeholder="请选择国家"
                  >
                    {
                      countryOptions.map(country =>
                        <Option
                          value={ country }
                          key={ country }
                        >
                          { country }
                        </Option>,
                      )
                    }
                  </Select>
                </div>
                <div className="select-wrapper">
                  <p>省份/洲</p>
                  <Select
                    className="skill-select-item"
                    value={ selectedProvince }
                    onChange={ this.handleProvinceChange }
                    disabled={ !selectedCountry }
                    placeholder="请选择省份/州"
                  >
                    {
                      provinceOptions.map(province =>
                        <Option
                          value={ province }
                          key={ province }
                        >
                          { province }
                        </Option>,
                      )
                    }
                  </Select>
                </div>
                <div className="select-wrapper">
                  <p>城市</p>
                  <Select
                    className="skill-select-item"
                    value={ selectedCity }
                    onChange={ this.handleCityChange }
                    disabled={ !selectedProvince }
                    placeholder="请选择城市"
                  >
                    {
                      cityOptions.map(city =>
                        <Option
                          value={ city }
                          key={ city }
                        >
                          { city }
                        </Option>,
                      )
                    }
                  </Select>
                </div>
              </div>
              <p style={ {
                marginTop: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
              } }>小区或街道名</p>
              <Select
                mode="combobox"
                value={ location }
                placeholder="如不清楚可输入名称来搜索"
                defaultActiveFirstOption={ false }
                showArrow={ false }
                onChange={ this.handleServiceLocationChange }
                className="place-select"
              >
                { locationOptions.map(({name, address, district, adcode}) =>
                  <Option
                    value={ `${district} ${address} ${name}` }
                    key={ `${adcode}${address}` }
                  >
                    { `${district} ${address} ${name}` }</Option>,
                ) }
              </Select>
              <p style={ {
                marginTop: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
              } }>具体地址</p>
              <Input
                value={ specAddr }
                onChange={ this.handleSpecAddrChange }
                placeholder="请输入具体地址"
              />
              { specAddrTooLong && <div className="error-tip">无法继续输入</div> }
            </div>
          </main>
          <div className="footer">
            <Button type="primary" onClick={ this.handleSubmit }>下一步</Button>
          </div>
        </div>
      }
    </div>)
  }

  componentDidMount () {
    this.setState({
      serviceId: this.props.location.state.serviceId,
      serviceName: this.props.location.state.serviceName,
    }, () => {
      this.getTemplate()
      this.mapInit()
      if (this.props.location.state && this.props.location.state.needsId) {
        this.getNeedDetail(this.props.location.state.needsId)
      }
    })
    this.getCityTree()
  }

}

export { PostDemand as page }