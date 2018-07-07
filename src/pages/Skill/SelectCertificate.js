import { Select } from 'antd'
import React from 'react'
import './static/style/index.less'

const Option = Select.Option

function SelectCertificate ({
                              countryOptions,
                              selectedCertification,
                              handleSelectedCertification,
                            }) {
  return (
    <div className="select-certificate-container">
      <h2 style={ {marginTop: '50px'} }>您希望使用哪种身份证件进行认证？</h2>
      <p style={ {marginTop: '10px', marginBottom: '50px'} }>只能添加由政府颁发的有效身份证件</p>
      <p className="title">签发国家/地区</p>
      <Select value="中国" className="country-select">
        <Option value="中国">中国</Option>
        { countryOptions.map(item => <Option key={ item }>item</Option>) }
      </Select>
      <p className="title">身份证件类型</p>
      <div className="icon-container">
        <div
          className={
            selectedCertification === 'passport'
              ? 'icon-wrapper selected'
              : 'icon-wrapper'
          }
          onClick={ handleSelectedCertification('passport') }
        >
          <img src="./images/identity-passport.png" alt="护照" width={ 50 } height={ 50 }/>
          <i className="iconfont icon-selected"/>
          <p>护照</p>
        </div>
        <div
          className={
            selectedCertification === 'idCard'
              ? 'icon-wrapper selected'
              : 'icon-wrapper'
          }
          onClick={ handleSelectedCertification('idCard') }
        >
          <i className="iconfont icon-selected"/>
          <img src="./images/identity-idcard.png" alt="身份证" width={ 50 } height={ 50 }/>
          <p>身份证</p>
        </div>
      </div>
      <p>你的身份信息不会透露给顾客和其他服务商</p>
    </div>
  )
}

export { SelectCertificate as view }

