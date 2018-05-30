import { Button, Progress } from 'antd'
import { message } from 'antd/lib/index'
import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { baseUrl } from '../../service/config'
import { getCityTree } from '../../service/homepage'
import { releaseSkill } from '../../service/skill'
import { view as InputPosition } from './InputPosition'
import { view as InputWorkTime } from './InputWorkTime'
import { view as Introduce } from './Introduce'
import { view as PartlyComplete } from './PartlyComplete'
import { view as SelectCertificate } from './SelectCertificate'
import { view as SelectSecondaryType } from './SelectSecondaryType'
import { view as SelectType } from './SelectType'
import './static/style/index.less'
import { view as UploadAvatar } from './UploadAvatar'
import { view as UploadCertificate } from './UploadCertificate'
import { view as UploadComplete } from './UploadComplete'

const uploadUrl = `${baseUrl}/qiniu/uploadUserFile`

const mapState = (state) => ({
  userId: state.user.userId || 11,
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
    introduce: '',
    location: '',
    locationOptions: [],
    specAddr: '',
    cityId: 110,
    lastCity: '',
    passportSrc: '',
    photoSrc: '',
    idCardPositiveSrc: '',
    idCardNegativeSrc: '',
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
          location={ this.state.location }
          handleLocationChange={ this.handleLocationChange }
          specAddr={ this.state.specAddr }
          handleSpecAddrChange={ this.handleSpecAddrChange }
          locationOptions={ this.state.locationOptions }
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
          uploadUrl={ uploadUrl }
          handleUploadAvatar={ this.handleUploadAvatar }
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
          uploadUrl={ uploadUrl }
          passportSrc={ this.state.passportSrc }
          photoSrc={ this.state.photoSrc }
          idCardNegativeSrc={ this.state.idCardNegativeSrc }
          idCardPositiveSrc={ this.state.idCardPositiveSrc }
          handleUpload={ this.handleUpload }
        />
      case 9:
        return <UploadComplete
        />
      default:
        return
    }
  }

  handleButtonClick = async () => {
    switch (this.state.step) {
      case 0:
        if (this.state.location && this.state.specAddr) {
          this.goNextStep()
          return
        } else {
          message.info('请填写地址')
          return
        }
      case 1:
        if (this.state.selectedType) {
          this.goNextStep()
          return
        } else {
          message.info('请选择工作类型')
          return
        }
      case 2:
        if (this.state.secondaryTypeList.length !== 0) {
          this.goNextStep()
          return
        } else {
          message.info('请选择工作类型')
          return
        }
      case 3:
        if (this.state.serviceTimeList.length !== 0) {
          this.goNextStep()
          return
        } else {
          message.info('请选择工作时间')
          return
        }
      case 4:
        if (this.state.introduce) {
          this.goNextStep()
          return
        } else {
          message.info('请输入自我介绍')
          return
        }
      case 5:
        if (this.state.avatarSrc) {
          const { data: { code, data } } = await releaseSkill({
            districtId: this.state.cityId,
            userId: this.state.userId || 11,
            location: this.state.location,
            specAddr: this.state.specAddr,
            latitude: 39.928216,
            longitude: 116.447962,
            serviceTime: this.state.serviceTimeList.join(','),
            serviceIds: [ 1, 2, 3 ].join(','),
            isUsed: 1,
            isDeleted: 0,
          })
          if (code === 200) {
            message.success('发布技能成功')
            this.setState({
              avatarSrc: data.path,
              step: this.state.step + 1,
              progressPercent: (this.state.step + 1) * 10 + 10,
            })
            return
          }
          message.error('请求服务器失败')
          return
        } else {
          message.info('请上传头像')
          return
        }
      case 6:
        this.goNextStep()
        return
      case 7:
        this.goNextStep()
        return
      case 8:
        this.goNextStep()
        return
      case 9:
        browserHistory.push('/search')
        return
      default:
        return
    }
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

  getCityTree = async () => {
    try {
      const { data: { code, data } } = await getCityTree()
      if (code !== 200) {
        return message.error('请求服务器失败')
      }
      const tree = data
      window.tree = data
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
      cityId: this.getCityIdByName(selectedCity),
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
      cityId: this.getCityIdByName(value) || '',
    })

  }

  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
      cityId: this.getCityIdByName(value) || '',
    })
  }

  goNextStep = () => this.setState({
    step: this.state.step + 1,
    progressPercent: (this.state.step + 1) * 10 + 10,
  })

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
          <Button type="primary" onClick={ this.handleButtonClick }>
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

  handleLocationChange = (value) => {
    this.getLocationOptions(value)
    this.setState({
      location: value,
    })
  }
  getLocationOptions = (keyword) => {
    this.mapApi.then(() => {
      console.log('here')
      if (this.state.lastCity && this.state.lastCity === this.state.selectedCity) {
        keyword && this.placeSearch.search(keyword, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            console.log(result.tips)
            this.setState({
              locationOptions: result.tips,
            })
          }
        })
        return
      }
      this.setState({
        lastCity: this.state.selectedCity,
      })
      /* eslint-disable no-undef */
      this.placeSearch = new AMap.Autocomplete({ city: this.state.selectedCity })
      keyword && this.placeSearch.search(keyword, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          console.log(result.tips)
          this.setState({
            locationOptions: result.tips,
          })
          // result.tips.map(item=>{
          //   console.log(typeof item.name)
          //   return 1
          // })
        }
      })
    })
  }

  // browserHistory.push('/search')
  // }

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

  constructor (props) {
    super(props)
    this.getLocationOptions = debounce(this.getLocationOptions, 800)
  }

  handleSpecAddrChange = (e) => {
    this.setState({
      specAddr: e.target.value,
    })
  }

  getCityIdByName = (cityName) => this.state.tree[ this.state.selectedCountry ]
    && Array.isArray(this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ])
    && this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ].find(item => item.chinese === cityName)
    && this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ].find(item => item.chinese === cityName).districtId

  handleUpload = (type) => (url) => {
    this.setState({
      [ type ]: url,
    })
  }

  componentDidMount () {
    this.getCityTree()
    this.mapInit()
  }
}

export { SkillPage as page }

