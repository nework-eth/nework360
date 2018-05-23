import React, { Component } from 'react'
import { Select, message, Spin } from 'antd'
import debounce from 'lodash/debounce'
import './static/style/index.less'
import { bindActionCreators } from 'redux'
import { getCityByLetter, getCityBySearch, getCityTree } from '../../service/homepage'
import { connect } from 'react-redux'
import { setCityName, setCityId } from '../../components/NavMenu/actions'
import { stateKey } from '../../components/NavMenu'

const Option = Select.Option

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const LetterCity = ({ letter, letterCityList }) => {
  return (
    <div className="letter-city-container">
      <div className="letter-container">
        { letter }
      </div>
      <div className="city-container">
        { letterCityList.map(({ chinese }, index) =>
          <div className="virtual-button" key={ index }>{ chinese }</div>,
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
    selectedCountry: '中国',
    selectedProvince: '北京',
    selectedCity: '北京',
    cityData: [],
    tree: [],
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
                  value={ selectedCountry }
                  onChange={ this.handleCountryChange }
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
                <Select
                  value={ selectedProvince }
                  onChange={ this.handleProvinceChange }
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
                  value={ selectedCity }
                  onChange={ this.handleCityChange }
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
                notFoundContent={ fetching ? <Spin size="small"/> : null }
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
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">北京</div>
            <div className="virtual-button">乌鲁木齐</div>
            <div className="virtual-button">北京</div>
          </div>
          <div className="first-letter">
            <h3>按城市首字母选择:&nbsp;&nbsp;&nbsp;</h3>
            {
              this.state.filterCityList.map(([ letter ]) =>
                <span
                  key={ letter.toUpperCase() }
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
              />,
            )
          }
        </div>
      </div>
    )
  }

  getCityByLetter = async () => {
    try {
      const { data: { data } } = await getCityByLetter({ countryId: 1 })
      const letterCityList = Object.entries(data).filter(([ letter, letterCityList ]) => {
        return letterCityList.length > 0
      })
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

  componentDidMount () {
    this.getCityByLetter()
    this.getCityTree()
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
    this.props.setCityName(selectedCity)
    this.props.setCityId((cityData.find(item => item.chinese === selectedCity).districtId))
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
      selectedCity: cityOptions[ 0 ],
    })
    this.props.setCityName(cityOptions[ 0 ])
    this.props.setCityId((cityData.find(item => item.chinese === cityOptions[ 0 ])).districtId)
  }

  handleCityChange = (value) => {
    this.setState({
      selectedCity: value,
    })
    this.props.setCityName(value)
    this.props.setCityId((this.state.cityData.find(item => item.chinese === value)).districtId)
  }
}

export { SelectCity as view }

