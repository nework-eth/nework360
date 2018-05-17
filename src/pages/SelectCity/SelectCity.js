import React from 'react'
import { view as TopMenu } from '../../components/NavMenu'
import { Input, Select } from 'antd'
import './static/style/index.less'

const containerStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100%',
}

const SelectCity = () => {
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
          <div className="virtual-button">北京</div>
        </div>
        <div className="first-letter">
          <h3>按城市首字母选择:</h3>
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
          <span>F</span>
          <span>G</span>
          <span>H</span>
          <span>I</span>
          <span>J</span>
          <span>K</span>
          <span>L</span>
          <span>M</span>
          <span>N</span>
          <span>O</span>
          <span>P</span>
          <span>Q</span>
          <span>R</span>
          <span>S</span>
          <span>T</span>
          <span>U</span>
          <span>V</span>
          <span>W</span>
          <span>X</span>
          <span>Y</span>
          <span>Z</span>
        </div>
      </div>
    </div>
  )
}

export { SelectCity as view }

