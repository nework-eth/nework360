import { message } from 'antd/lib/index'
import React, { Component } from 'react'
import { Progress } from 'antd'
import { getCityTree } from '../../service/homepage'
import { view as InputPosition } from './InputPosition'
import { view as UploadComplete } from './UploadComplete'
import { view as SelectedType } from './SelectType'
import { view as InputWorkTime } from './InputWorkTime'
import { view as PartlyComplete } from './PartlyComplete'
import { view as UploadAvatar } from './UploadAvatar'

class SkillPage extends Component {
  state = {
    step: 1,
    selectedCountry: '中国',
    countryOptions: [],
    selectedProvince: '北京',
    provinceOptions: [],
    selectedCity: '北京',
    cityOptions: [],
  }

  render () {
    return (
      <div style={ { width: '700px', margin: '0 auto' } }>
        <h2 style={ { margin: '50px 0' } }>
          <i
            className="iconfont icon-logo"
            style={ { fontSize: '30px', lineHeight: '40px' } }
          />
        </h2>
        <Progress
          percent={ 30 }
          showInfo={ false }
          style={ { height: '5px' } }
        />
        {
          this.StepView()
        }
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
        return <UploadAvatar/>
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

}

export { SkillPage as page }

