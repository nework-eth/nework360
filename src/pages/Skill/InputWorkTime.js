import React from 'react'
// import { Input, Select } from 'antd'
import './static/style/input-work-time.less'

function InputWorkTime ({ serviceTimeList, handleWorkTimeItemClick }) {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>您希望在什么时间工作？</h2>
      <div className="input-work-time-container">
        <div
          className={ serviceTimeList.includes('w') ? 'checked-time-item' : '' }
          onClick={ handleWorkTimeItemClick('w') }
        >
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 } alt="工作日"/>
          <i className="iconfont icon-selected"/>
          <p>周一至周五</p>
        </div>
        <div
          className={ serviceTimeList.includes('sat') ? 'checked-time-item' : '' }
          onClick={ handleWorkTimeItemClick('sat') }
        >
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 } alt="周六"/>
          <i className="iconfont icon-selected"/>
          <p>周六</p>
        </div>
        <div
          className={ serviceTimeList.includes('sun') ? 'checked-time-item' : '' }
          onClick={ handleWorkTimeItemClick('sun') }
        >
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 } alt="周日"/>
          <i className="iconfont icon-selected"/>
          <p>周日</p>
        </div>
      </div>
    </div>
  )
}

export { InputWorkTime as view }
