import React, { Component } from 'react'
import { Input, Select, message, Spin } from 'antd'
import debounce from 'lodash/debounce'
import './static/style/index.less'
import { getCityByLetter, getCityBySearch } from '../../service/homepage'

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

class SelectCity extends Component {
  constructor (props) {
    super(props)
    this.lastFetchId = 0
    this.getCityBySearch = debounce(this.getCityBySearch, 800)
  }

  state = {
    value: [],
    fetching: false,
    cityList: [],
    filterCityList: [],
    filterLetter: '',
  }

  getCityBySearch = (value) => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    getCityBySearch()
  }

  render () {
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
              <Input/>
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
      const {data:{data}} = await getCityByLetter({ countryId: 1 })
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

