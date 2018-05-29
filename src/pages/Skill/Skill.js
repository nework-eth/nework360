import { message } from 'antd/lib/index'
import React, { Component } from 'react'
import { Progress, Button } from 'antd'
import { getCityTree } from '../../service/homepage'
import { view as InputPosition } from './InputPosition'
import { view as UploadComplete } from './UploadComplete'
import { view as SelectType } from './SelectType'
import { view as InputWorkTime } from './InputWorkTime'
import { view as Introduce } from './Introduce'
import { view as PartlyComplete } from './PartlyComplete'
import { view as UploadAvatar } from './UploadAvatar'
import { view as SelectSecondaryType } from './SelectSecondaryType'
import { view as SelectCertificate } from './SelectCertificate'
import { view as UploadCertificate } from './UploadCertificate'
import './static/style/index.less'
import { connect } from 'react-redux'
import { baseUrl } from '../../service/config'
import { browserHistory } from 'react-router'

const mapState = (state) => ({
  userId: state.user.userId,
})

@connect(mapState)
class SkillPage extends Component {
  state = {
    step: 0,
    selectedCountry: '中国',
    countryOptions: [],
    selectedProvince: '北京',
    provinceOptions: [],
    selectedCity: '北京',
    cityOptions: [],
    selectedType: '',
    inputType: '',
    certificateType: '',
    progressPercent: 10,
    avatarSrc: '',
    secondaryTypeList: [],
    serviceTimeList: [],
    selectedCertification: '',
    uploadUrl: `${baseUrl}/qiniu/uploadUserFile`,
    introduce: '',
  }

  render () {
    const { progressPercent, step } = this.state
    return (
      <div className="skill-container">
        <main style={ { width: '700px', margin: '0 auto' } }>
          <h2 style={ { margin: '50px 0' } }>
            <i
              className="iconfont icon-logo"
              style={ { fontSize: '30px', lineHeight: '40px' } }
            />
          </h2>
          <Progress
            percent={ progressPercent }
            showInfo={ false }
            style={ { height: '5px' } }
          />
          {
            this.StepView()
          }
        </main>
        <footer>
          <p
            onClick={ this.handleGoBack }
            style={ step === 0 || step === 9 ? { visibility: 'hidden' } : {} }
          >
            <i className="iconfont icon-return"/>
            返回
          </p>
          <Button type="primary" onClick={ this.handleGoNextStep }>
            {
              step !== 9
                ? '下一步'
                : '完成'
            }
          </Button>
        </footer>
      </div>
    )
  }

  StepView = () => {
    switch (this.state.step) {
      case 0:
        return <InputPosition
          selectedCountry={ this.state.selectedCountry }
          countryOptions={ this.state.countryOptions }
          selectedProvince={ this.state.selectedProvince }
          provinceOptions={ this.state.provinceOptions }
          selectedCity={ this.state.selectedCity }
          cityOptions={ this.state.cityOptions }
          handleCountryChange={ this.handleCountryChange }
          handleProvinceChange={ this.handleProvinceChange }
          handleCityChange={ this.handleCityChange }
        />
      case 1:
        return <SelectType
          handleSelectType={ this.handleSelectType }
          handleInputType={ this.handleInputType }
          selectedType={ this.state.selectedType }
          inputType={ this.state.inputType }
        />
      case 2:
        return <SelectSecondaryType
          selectedType={ this.state.selectedType }
          secondaryTypeList={ this.state.secondaryTypeList }
          handleSecondaryTypeClick={ this.handleSecondaryTypeClick }
        />
      case 3:
        return <InputWorkTime
          serviceTimeList={ this.state.serviceTimeList }
          handleWorkTimeItemClick={ this.handleWorkTimeItemClick }
        />
      case 4:
        return <Introduce
          introduce={ this.state.introduce }
          handleIntroduceChange={ this.handleIntroduceChange }
        />
      case 5:
        return <UploadAvatar
          avatarSrc={ this.state.avatarSrc }
          userId={ this.props.userId }
          uploadUrl={ this.state.uploadUrl }
        />
      case 6:
        return <PartlyComplete/>
      case 7:
        return <SelectCertificate
          selectedCertification={ this.state.selectedCertification }
          handleSelectedCertification={ this.handleSelectedCertification }
        />
      case 8:
        return <UploadCertificate
          selectedCertification={ this.state.selectedCertification }
          userId={ this.props.userId }
          uploadUrl={ this.state.uploadUrl }
        />
      case 9:
        return <UploadComplete
          userId={ this.props.userId }
          uploadUrl={ this.state.uploadUrl }
        />
      default:
        return
    }
  }

  getCityTree = async () => {
    try {
      const { data: { code, data } } = await getCityTree()
      if (code !== 200) {
        return message.error('请求服务器失败')
      }
      const tree = data
      console.log(tree)
      const countryList = Object.keys(tree)
      const provinceList = Object.keys(tree[ '中国' ])
      const letterCityList = tree[ '中国' ][ '北京' ].map(item => item.chinese)
      this.setState({
        tree,
        countryOptions: countryList,
        provinceOptions: provinceList,
        cityOptions: letterCityList,
        // cityOptions: letterCityList,
        // selectedCity: letterCityList[0]
      })
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  handleCountryChange = (value) => {
    console.log(this.state.tree[ value ])
    const provinceOptions = Object.keys(this.state.tree[ value ])
    const selectedProvince = provinceOptions[ 0 ]
    const cityData = this.state.tree[ value ][ selectedProvince ]
    const cityOptions = cityData.map(item => item.chinese)
    const selectedCity = cityOptions[ 0 ]
    this.setState({
      selectedCountry: value,
      provinceOptions,
      selectedProvince: Object.keys(this.state.tree[ value ])[ 0 ],
      cityData,
      cityOptions,
      selectedCity,
    })
  }

  handleProvinceChange = (value) => {
    console.log(this.state.tree[ this.state.selectedCountry ][ value ])
    const cityData = this.state.tree[ this.state.selectedCountry ][ value ]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedProvince: value,
      cityData,
      cityOptions,
      selectedCity: cityOptions[ 0 ],
    })
  }

  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
    })
  }

  componentDidMount () {
    this.getCityTree()
  }

  handleGoNextStep = () => {
    if (this.state.step !== 9) {
      this.setState({
        step: this.state.step + 1,
        progressPercent: (this.state.step + 1) * 10 + 10,
      })
      return
    }
    browserHistory.push('/search')
  }

  handleGoBack = () => {
    this.setState({
      step: this.state.step - 1,
      progressPercent: (this.state.step - 1) * 10 + 10,
    })
  }

  handleSelectType = (type) => () => {
    this.setState({
      selectedType: type,
    })
  }

  handleInputType = (e) => {
    this.setState({
      inputType: e.target.value,
    })
  }

  handleSecondaryTypeClick = (type) => () => {
    if (this.state.secondaryTypeList.includes(type)) {
      this.setState({
        secondaryTypeList: this.state.secondaryTypeList.filter(item => item !== type),
      })
    } else {
      this.setState({
        secondaryTypeList: [ ...this.state.secondaryTypeList, type ],
      })
    }
  }

  handleWorkTimeItemClick = (type) => () => {
    if (this.state.serviceTimeList.includes(type)) {
      this.setState({
        serviceTimeList: this.state.serviceTimeList.filter(item => item !== type),
      })
    } else {
      this.setState({
        serviceTimeList: [ ...this.state.serviceTimeList, type ],
      })
    }
  }

  handleSelectedCertification = (type) => () => {
    this.setState({
      selectedCertification: type,
    })
  }

  handleUploadAvatar = (url) => {
    this.setState({
      avatarSrc: url,
    })
  }

  handleIntroduceChange = (e) => {
    this.setState({
      introduce: e.target.value,
    })
  }
}

export { SkillPage as page }

