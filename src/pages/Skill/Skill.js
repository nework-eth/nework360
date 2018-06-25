import { Button, Progress } from 'antd'
import { message } from 'antd/lib/index'
import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { setUser } from '../../components/NavMenu/actions'
import { baseUrl } from '../../service/config'
import { getUserById, postSkillTemp, updateUser } from '../../service/editData'
import { getCityTree } from '../../service/homepage'
import { getServiceList, releaseSkill } from '../../service/skill'
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
  userId: state.user.userId,
  user: state.user,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setUser,
}, dispatch)

@connect(mapState, mapDispatch)
class SkillPage extends Component {
  state = {
    step: 0,
    selectedCountry: undefined,
    countryOptions: [],
    selectedProvince: undefined,
    provinceOptions: [],
    selectedCity: undefined,
    cityOptions: [],
    selectedType: '',
    inputType: '',
    secondaryInputType: '',
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
    cityData: [],
    serviceList: [],
    firstServiceList: [],
    secondServiceList: [],
    latitude: '',
    longitude: '',
    specAddrTooLong: false,
    inputTypeTooLong: false,
    description: '',
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
          handleLocationSelect={ this.handleLocationSelect }
          specAddrTooLong={ this.state.specAddrTooLong }
        />
      case 1:
        return <SelectType
          firstServiceList={ this.state.firstServiceList }
          handleSelectType={ this.handleSelectType }
          handleInputType={ this.handleInputType }
          selectedType={ this.state.selectedType }
          inputType={ this.state.inputType }
          inputTypeTooLong={ this.state.inputTypeTooLong }
        />
      case 2:
        return <SelectSecondaryType
          secondServiceList={ this.state.secondServiceList }
          selectedType={ this.state.selectedType }
          secondaryTypeList={ this.state.secondaryTypeList }
          handleSecondaryTypeClick={ this.handleSecondaryTypeClick }
          secondaryInputType={ this.state.secondaryInputType }
          handleSecondaryInputType={ this.handleSecondaryInputType }
        />
      case 3:
        return <InputWorkTime
          serviceTimeList={ this.state.serviceTimeList }
          handleWorkTimeItemClick={ this.handleWorkTimeItemClick }
        />
      case 4:
        return <Introduce
          introduce={ this.state.description }
          handleDescriptionChange={ this.handleDescriptionChange }
        />
      case 5:
        return <UploadAvatar
          avatarSrc={ this.state.avatarSrc }
          userId={ this.props.userId }
          uploadUrl={ uploadUrl }
          handleUploadAvatar={ this.handleUploadAvatar }
          updateImageSrc={ this.updateImageSrc }
          errorTip={ this.state.avatarErrorTip }
          setErrorTip={ this.setErrorTip }
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
          updateImageSrc={ this.updateImageSrc }
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
        // if (this.state.location && this.state.specAddr) {
        // if (!this.state.latitude) {
        //   /* eslint-disable no-undef */
        // }
        // if (!this.state.latitude) {
        this.geoCoder([ this.goNextStep, this.getServiceList ])
        return
      // }
      // this.geoCoder()
      // this.goNextStep()
      // this.getServiceList()
      // return
      case 1:
        if (this.state.selectedType) {
          this.goNextStep()
          const parentId = (this.state.firstServiceList
            .find(item => item.serviceTypeName === this.state.selectedType)).serviceTypeId
          if (parentId >= 0) {
            this.setState({
              secondServiceList: [ ...this.state.secondServiceList.filter(item => item.parentId === parentId), {
                serviceTypeName: '其他',
                level: 's',
                serviceTypeId: -1,
              } ],
            })
          } else {
            this.setState({
              secondServiceList: [],
            })
          }
          return
        } else {
          message.info('请选择工作类型')
          return
        }
      case 2:
        this.goNextStep()
        return
      case 3:
        this.goNextStep()
        return
      case 4:
        this.goNextStep()
        return
      case 5:
        if (this.state.secondaryTypeList.some(item => item !== -1)) {
          const { data: { code, data } } = await releaseSkill({
            userId: this.props.user.userId,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            serviceIds: this.state.secondaryTypeList.filter(item => item !== -1).join(','),
          })
          if (code !== 200) {
            message.error('网络连接失败，请检查网络后重试')
            return
          }
        }
        if (this.state.secondaryTypeList.includes(-1) || this.state.selectedType === '其他') {
          const { data: { desc, code } } = await postSkillTemp(JSON.stringify([
            {
              userId: this.props.user.userId,
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              serviceName: this.state.inputType || this.state.selectedType,
              level: 'f',
            },
            {
              districtId: this.state.cityId,
              userId: this.props.user.userId,
              location: this.state.location,
              specAddr: this.state.specAddr,
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              serviceTime: this.state.serviceTimeList.join(','),
              serviceName: this.state.secondaryInputType,
              level: 's',
            },
          ]))
          if (code !== 200) {
            message.error('网络连接失败，请检查网络后重试')
            return
          }
        }
        const { data: { code, desc } } = await updateUser({
          districtId: this.state.cityId,
          userId: this.props.user.userId,
          location: this.state.location,
          specAddr: this.state.specAddr,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          serviceTime: this.state.serviceTimeList.join(','),
          description: this.state.description,
          isPartyB: true,
        })
        if (code !== 200) {
          message.error('网络连接失败，请检查网络后重试')
          return
        }
        this.setState({
          step: this.state.step + 1,
          progressPercent: (this.state.step + 1) * 10 + 10,
        })
        message.success('发布技能成功')
        const res = await getUserById({ userId: this.props.user.userId })
        if (res.data.code !== 200) {
          message.error('网络连接失败，请检查网络后重试')
          return
        }
        this.props.setUser(res.data.data)
        return
      case 6:
        this.goNextStep()
        return
      case 7:
        this.goNextStep()
        return
      case 8:
        this.goNextStep()
        this.updateStatus()
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
          AMap.plugin('AMap.Geocoder', () => {
            resolve()
          })
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  getCityTree = async () => {
    // try {
    // const { data: { code, data } } = await getCityTree()
    // if (code !== 200) {
    //   return message.error('网络连接失败，请检查网络后重试')
    // }
    const data = await getCityTree()
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
      cityData: tree[ '中国' ][ '北京' ],
    })
    // } catch (e) {
    //   message.error('网络连接失败，请检查网络后重试')
    // }
  }

  handleCountryChange = (value) => {
    // console.log(this.state.tree[ value ])
    const provinceOptions = Object.keys(this.state.tree[ value ])
    const selectedProvince = provinceOptions[ 0 ]
    const cityData = this.state.tree[ value ][ selectedProvince ]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedCountry: value,
      provinceOptions,
      // selectedProvince: Object.keys(this.state.tree[ value ])[ 0 ],
      selectedProvince: undefined,
      cityData,
      cityOptions,
      // selectedCity,
      selectedCity: undefined,
      // cityId: (cityData.find(item => item.chinese === selectedCity)).districtId,
      location: '',
      specAddr: '',
    })
  }

  handleProvinceChange = (value) => {
    // console.log(this.state.tree[ this.state.selectedCountry ][ value ])
    const cityData = this.state.tree[ this.state.selectedCountry ][ value ]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedProvince: value,
      cityData,
      cityOptions,
      selectedCity: undefined,
      // cityId: (cityData.find(item => item.chinese === cityOptions[ 0 ])).districtId,
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

  goNextStep = () => this.setState({
    step: this.state.step + 1,
    progressPercent: (this.state.step + 1) * 10 + 10,
  })

  getLocationOptions = (keyword) => {
    this.mapApi.then(() => {
      // if (this.state.lastCity && this.state.lastCity === this.state.selectedCity) {
      //   keyword && this.placeSearch.search(keyword, (status, result) => {
      //     if (status === 'complete' && result.info === 'OK') {
      //       console.log(result)
      //       this.setState({
      //         locationOptions: result.tips,
      //       })
      //     }
      //   })
      //   return
      // }
      // this.setState({
      //   lastCity: this.state.selectedCity,
      // })
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

  handleLocationChange = (value) => {
    // console.log('change')
    this.getLocationOptions(value)
    this.setState({
      location: value,
    })
  }
  handleInputType = (e) => {
    let str = e.target.value
    if (str.length > 10) {
      str = str.slice(0, 10)
      this.setState({
        inputTypeTooLong: true,
      })
    } else if (this.state.inputTypeTooLong) {
      this.setState({
        inputTypeTooLong: false,
      })
    }
    this.setState({
      inputType: str,
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

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleSecondaryInputType = (e) => {
    this.setState({
      secondaryInputType: e.target.value,
    })
  }

  handleSecondaryTypeClick = (id) => () => {
    if (this.state.secondaryTypeList.includes(id)) {
      this.setState({
        secondaryTypeList: this.state.secondaryTypeList.filter(item => item !== id),
      })
    } else {
      this.setState({
        secondaryTypeList: [ ...this.state.secondaryTypeList, id ],
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

  handleUploadAvatar = async (url) => {
    this.setState({
      avatarSrc: url,
    })
    this.props.setUser({ ...this.props.user, avatar: url })
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

  constructor (props) {
    super(props)
    this.getLocationOptions = debounce(this.getLocationOptions, 800)
  }

  render () {
    const {
      progressPercent,
      step,
      selectedCity,
      selectedProvince,
      selectedCountry,
      location,
      specAddr,
      selectedType,
      inputType,
      secondaryTypeList,
      secondaryInputType,
      serviceTimeList,
      description,
      avatarSrc,
      photoSrc,
      idCardPositiveSrc,
      idCardNegativeSrc,
      passportSrc,
      selectedCertification,
    } = this.state
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
          <Button type="primary" onClick={ this.handleButtonClick }
            disabled={ step === 0
              ? !selectedCountry || !selectedProvince || !selectedCity || !location || !specAddr
              : step === 1
                ? (!selectedType || (selectedType === '其他' && !inputType))
                : step === 2
                  ? (selectedType !== '其他' && ((secondaryTypeList.length === 1 && secondaryTypeList[ 0 ] === -1 && !secondaryInputType) || !secondaryTypeList.length)) || (selectedType === '其他' && !secondaryInputType)
                  : step === 3
                    ? serviceTimeList.length === 0
                    : step === 4
                      ? !description
                      : step === 5
                        ? !avatarSrc
                        : step === 7
                          ? !selectedCertification
                          : step === 8
                            ? !photoSrc || (!passportSrc && (!idCardNegativeSrc || !idCardPositiveSrc))
                            : false
            }
          >
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

  // getCityIdByName = (cityName) => this.state.tree[ this.state.selectedCountry ]
  //   && Array.isArray(this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ])
  //   && this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ].find(item => item.chinese === cityName)
  //   && this.state.tree[ this.state.selectedCountry ][ this.state.selectedProvince ].find(item => item.chinese === cityName).districtId

  handleUpload = (type) => (url) => {
    this.setState({
      [ type ]: url,
    })
  }

  getServiceList = async () => {
    try {
      // const { data: { code, data, desc } } = await getServiceList({
      //   dist: this.state.selectedCity,
      // })
      // if (code !== 200) {
      //   message.error(desc)
      //   return
      // }
      const data = await getServiceList({
        dist: this.state.selectedCity,
      })
      console.log('servicelist', data)
      this.setState({
        serviceList: data,
        firstServiceList: [ ...data.filter(item => item.level === 'f'), {
          serviceTypeName: '其他',
          level: 'f',
          serviceTypeId: -1,
        } ],
        secondServiceList: data.filter(item => item.level === 's'),
      })
    } catch (e) {
      console.log(e)
      message.error(e)
    }
  }

  // handleLocationSelect = (value) => {
  //   console.log('select')
  //   const name = value.split(' ')[ 2 ]
  //   const { location } = this.state.locationOptions.find(item => item.name === name)
  //   this.setState({
  //     latitude: location.lat,
  //     longitude: location.lng,
  //   })
  // }

  updateImageSrc = (src, type) =>
    updateUser({
      userId: this.props.user.userId,
      [ type ]: src,
    })

  componentDidMount () {
    this.getCityTree()
    this.mapInit()
  }

  updateStatus = async () => {
    // const { data: { desc, code } } = await updateUser({
    //   userId: this.props.user.userId,
    //   checkStatus: 1,
    // })
    // if (code !== 200) {
    //   message.error(desc)
    // }
    await updateUser({
      userId: this.props.user.userId,
      checkStatus: 1,
    })
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
            latitude: result.geocodes[ 0 ].location.lat,
            longitude: result.geocodes[ 0 ].location.lng,
          })
          cbArr.forEach(item => item())
          return
        }
        message.error('地址位置不够精确，请确保你所添加的信息是正确的')
      })
    })
  }
}

export { SkillPage as page }

