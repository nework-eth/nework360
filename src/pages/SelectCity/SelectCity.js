import React, { Component } from 'react'
import { Select, message, Spin } from 'antd'
import debounce from 'lodash/debounce'
import './static/style/index.less'
import { bindActionCreators } from 'redux'
import { getCityByLetter, getCityBySearch } from '../../service/homepage'
import { connect } from 'react-redux'
import { setCity } from '../../components/NavMenu/actions'
import { stateKey } from '../../components/NavMenu'

const Option = Select.Option

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const LetterCity = ({ letter, cityList }) => {
  return (
    <div className="letter-city-container">
      <div className="letter-container">
        { letter }
      </div>
      <div className="city-container">
        { cityList.map(({ chinese }, index) =>
          <div className="virtual-button" key={ index }>{ chinese }</div>,
        ) }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  city: state[ stateKey ] || '北京',
})

const mapDispatch = (dispatch) => bindActionCreators({
  setCity: setCity,
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
    cityList: [],
    filterCityList: [],
    filterLetter: '',
    searchOptions: [],
  }

  getCityBySearch = (value) => {
    console.log('fetching user', value)
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
    this.props.setCity(value)
  }

  render () {
    const { fetching, value, searchOptions } = this.state
    return (
      <div style={ containerStyle }>
        <div className="select-city-container">
          <h2>选择城市</h2>
          <div className="search-container">
            <div>
              <h3>搜索城市</h3>
              <div className="select-container">
                <Select/>
                <Select/>
                <Select/>
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
            this.state.filterCityList.map(([ letter, cityList ], index) =>
              <LetterCity
                key={ index }
                letter={ letter.toUpperCase() }
                cityList={ cityList }
              />,
            )
          }
        </div>
      </div>
    )
  }

  async componentDidMount () {
    try {
      const { data: { data } } = await getCityByLetter({ countryId: 1 })
      const cityList = Object.entries(data).filter(([ letter, cityList ]) => {
        return cityList.length > 0
      })
      this.setState({
        cityList,
        filterCityList: cityList,
      })
    } catch (e) {
      message.error(e.message)
    }
  }
}

export { SelectCity as view }

