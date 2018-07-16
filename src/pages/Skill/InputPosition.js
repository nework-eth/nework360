import { Input, Select } from 'antd'
import React from 'react'
import './static/style/input-position.less'

const Option = Select.Option

function InputPosition ({
                          selectedCountry,
                          countryOptions,
                          selectedProvince,
                          provinceOptions,
                          selectedCity,
                          cityOptions,
                          handleCountryChange,
                          handleProvinceChange,
                          handleCityChange,
                          location,
                          handleLocationChange,
                          specAddr,
                          handleSpecAddrChange,
                          locationOptions,
                          handleLocationSelect,
                          specAddrTooLong,
                        }) {
  return (
    <div className="input-position-container">
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>您打算在什么地方开展工作？</h2>
      <div className="select-container">
        <div className="select-wrapper">
          <p>国家或地区</p>
          <Select
            className="skill-select-item"
            value={ selectedCountry }
            onChange={ handleCountryChange }
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
        <div>
          <p>省份/州</p>
          <Select
            className="skill-select-item"
            value={ selectedProvince }
            onChange={ handleProvinceChange }
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
        <div>
          <p>城市</p>
          <Select
            className="skill-select-item"
            value={ selectedCity }
            onChange={ handleCityChange }
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
      <p>小区或街道名</p>
      <Select
        mode="combobox"
        value={ location }
        placeholder="如不清楚可输入名称来搜索"
        defaultActiveFirstOption={ false }
        showArrow={ false }
        onChange={ handleLocationChange }
        className="place-select"
        onSelect={ handleLocationSelect }
      >
        { locationOptions.map(({ name, address, district, adcode }) =>
          <Option
            value={ `${district} ${address} ${name}` }
            key={ `${adcode}${address}` }
          >
            { `${district} ${address} ${name}` }</Option>,
        ) }
      </Select>
      <p>具体地址</p>
      <Input
        value={ specAddr }
        onChange={ handleSpecAddrChange }
        placeholder="请输入具体地址"
      />
      { specAddrTooLong && <div className="error-tip">无法继续输入</div> }
    </div>
  )
}

export { InputPosition as view }
