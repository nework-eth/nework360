import { message, Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { stateKey } from '../../components/NavMenu'
import { setCityId, setCityName, setCountryId } from '../../components/NavMenu/actions'
import { getCityByLetter, getCityBySearch, getCityTree, getHotCity } from '../../service/homepage'
import './static/style/index.less'

const Option = Select.Option

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const LetterCity = ({ letter, letterCityList, handleClick }) => {
  return (
    <div className="letter-city-container" id={ `letter${letter.toUpperCase()}` }>
      <div className="letter-container">
        { letter }
      </div>
      <div className="city-container">
        { letterCityList.map(({ chinese, districtId }, index) =>
          <div className=
            "virtual-button"
            key={ index }
            onClick={ () => {handleClick(chinese, districtId)} }
          >
            { chinese }
          </div>,
        ) }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  cityName: state[ stateKey ].cityName || '北京',
  countryId: state[ stateKey ].countryId || 1,
  cityId: state[ stateKey ].countryId || 110,
})

const mapDispatch = (dispatch) => bindActionCreators({
  setCountryId: setCountryId,
  setCityName: setCityName,
  setCityId: setCityId,
}, dispatch)

@connect(mapState, mapDispatch)
class SelectCity extends Component {
  constructor (props) {
    super(props)
    this.lastFetchId = 0
    this.getCityBySearch = debounce(this.getCityBySearch, 800)
  }

  state = {
    data: [],
    value: '',
    fetching: false,
    letterCityList: [],
    filterCityList: [],
    filterLetter: '',
    searchOptions: [],
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    selectedCountry: undefined,
    selectedProvince: undefined,
    selectedCity: undefined,
    cityData: [],
    tree: [],
    hotCityList: [],
  }

  getCityBySearch = (value) => {
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    if (/^[a-zA-Z]+/.test(value)) {
      return getCityBySearch({ name: value })
        .then(({ data: { data } }) => {
          if (fetchId !== this.lastFetchId) {
            return
          }
          this.setState({ searchOptions: data.filter(item => item.level === 'c'), fetching: false })
        })
    }
    getCityBySearch({ chinese: value })
      .then(({ data: { data } }) => {
        if (fetchId !== this.lastFetchId) {
          return
        }
        this.setState({ searchOptions: data.filter(item => item.level === 'c'), fetching: false })
      })
  }

  handleChange = (value) => {
    this.setState({
      value,
      searchOptions: [],
      fetching: false,
    })
  }

  handleSelect = (value) => {
    this.setState({
      value,
      searchOptions: [],
      fetching: false,
    })
    console.log(value)
    this.props.setCityName(value)
  }
  getHotCity = async () => {
    try {
      const { data: { data, code, desc } } = await getHotCity()
      if (code !== 200) {
        message.error(desc)
        return
      }
      this.setState({
        hotCityList: data,
      })
    } catch (e) {
      message.error('请求服务器失败')
    }
  }

  getCityByLetter = async () => {
    try {
      const { data: { data } } = await getCityByLetter({ countryId: this.props.countryId || 1 })
      const letterCityList = Object.entries(data).filter(([ letter, letterCityList ]) => {
        return letterCityList.length > 0
      })
      console.log(letterCityList)
      this.setState({
        letterCityList,
        filterCityList: letterCityList,
      })
    } catch (e) {
      message.error('请求服务器失败')
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
      this.props.setCityName('北京')
      this.props.setCityId(110)
      this.props.setCountryId(1)
    } catch (e) {
      message.error('请求服务器失败')
    }
  }
  handleCountryChange = (value) => {
    console.log(this.state.tree[ value ])
    const provinceOptions = Object.keys(this.state.tree[ value ])
    const selectedProvince = provinceOptions[ 0 ]
    const cityData = this.state.tree[ value ][ selectedProvince ]
    // const cityOptions = cityData.map(item => item.chinese)
    // const selectedCity = cityOptions[ 0 ]
    this.setState({
      selectedCountry: value,
      provinceOptions,
      // selectedProvince: Object.keys(this.state.tree[ value ])[ 0 ],
      selectedProvince: undefined,
      // cityData,
      // cityOptions,
      selectedCity: undefined,
    })
    // this.props.setCountryId(value)
    // this.props.setCityName(selectedCity)
    // this.props.setCityId((cityData.find(item => item.chinese === selectedCity).districtId))
  }

  componentDidMount () {
    this.getCityByLetter()
    this.getCityTree()
    this.getHotCity()
  }

  handleProvinceChange = (value) => {
    console.log(value)
    console.log(this.state.tree[ this.state.selectedCountry ][ value ])
    const cityData = this.state.tree[ this.state.selectedCountry ][ value ]
    const cityOptions = cityData.map(item => item.chinese)
    this.setState({
      selectedProvince: value,
      cityData,
      cityOptions,
      selectedCity: undefined,
    })
    // this.props.setCityName(cityOptions[ 0 ])
    // this.props.setCityId((cityData.find(item => item.chinese === cityOptions[ 0 ])).districtId)
  }
  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
    })
    this.props.setCityName(value)
    this.props.setCityId((this.state.cityData.find(item => item.chinese === value)).districtId)
    browserHistory.push('/')
  }
  handleButtonClick = (cityName, cityId) => {
    this.props.setCityName(cityName)
    this.props.setCityId(cityId)
    browserHistory.push('/')
  }
  scrollToLetter = (letter) => () => {
    browserHistory.push(`/select-city#letter${letter.toUpperCase()}`)
  }

  render () {
    const {
      fetching,
      value,
      searchOptions,
      countryOptions,
      provinceOptions,
      cityOptions,
      selectedCountry,
      selectedProvince,
      selectedCity,
      hotCityList,
    } = this.state
    return (
      <div style={ containerStyle }>
        <div className="select-city-container">
          <h2>选择城市</h2>
          <div className="search-container">
            <div>
              <h3>搜索城市</h3>
              <div className="select-container">
                <Select
                  placeholder="请选择国家"
                  value={ selectedCountry }
                  onChange={ this.handleCountryChange }
                  dropdownClassName="select-city-select-drop"
                >
                  {
                    countryOptions.map(country =>
                      <Option
                        value={ country }
                        key={ country }
                        className="select-option"
                      >
                        { country }
                      </Option>,
                    )
                  }
                </Select>
                <Select
                  placeholder="请选择省份/洲"
                  value={ selectedProvince }
                  onChange={ this.handleProvinceChange }
                  disabled={ !selectedCountry }
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
                <Select
                  placeholder="请选择城市"
                  value={ selectedCity }
                  onChange={ this.handleCityChange }
                  disabled={ !selectedProvince }
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
            <div>
              <h3>直接搜索</h3>
              <Select
                mode="combobox"
                value={ value }
                placeholder="输入关键词"
                notFoundContent={ fetching ? <Spin size="small"/> : '未找到匹配的城' }
                filterOption={ false }
                onSearch={ this.getCityBySearch }
                onChange={ this.handleChange }
                onSelect={ this.handleSelect }
                className="search-select"
              >
                { searchOptions.map(item => <Option key={ item.chinese }>{ item.chinese }</Option>) }
              </Select>
            </div>
          </div>
          <h3>热门城市</h3>
          <div className="hot-city">
            {
              hotCityList.map(({ chinese, districtId }) => <div
                key={ chinese }
                  className="virtual-button"
                onClick={ () => this.handleButtonClick(chinese, districtId) }
                >
                { chinese }
                </div>,
              )
            }
          </div>
          <div className="first-letter">
            <h3>按城市首字母选择:&nbsp;&nbsp;&nbsp;</h3>
            {
              this.state.filterCityList.map(([ letter ]) =>
                <span
                  key={ letter.toUpperCase() }
                  onClick={ this.scrollToLetter(letter) }
                >
                  { letter.toUpperCase() }
                </span>,
              )
            }
          </div>
          {
            this.state.filterCityList.map(([ letter, letterCityList ], index) =>
              <LetterCity
                key={ index }
                letter={ letter.toUpperCase() }
                letterCityList={ letterCityList }
                handleClick={ this.handleButtonClick }
              />,
            )
          }
        </div>
      </div>
    )
  }
}

export { SelectCity as view }

