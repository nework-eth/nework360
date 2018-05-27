import React from 'react'
import { Input, Select } from 'antd'

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
                        }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px' } }>您打算在什么地方开展工作？</h2>
      <div className="select-container">
        <div>
          <p>国家或地区</p>
          <Select
          value={ selectedCountry }
          onChange={ handleCountryChange }
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
          <p>省份/洲</p>
          <Select
          value={ selectedProvince }
          onChange={ handleProvinceChange }
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
          value={ selectedCity }
          onChange={ handleCityChange }
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
        <p>小区或街道名</p>
        <Input/>
        <p>具体地址</p>
        <Input/>
      </div>
    </div>
  )
}

export { InputPosition as view }
