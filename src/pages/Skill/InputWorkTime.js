import React from 'react'

// import { Input, Select } from 'antd'
import './static/style/input-work-time.less'

function InputWorkTime () {
  return (
    <div>
      <h2 style={ { marginTop: '50px', marginBottom: '50px' } }>您希望在什么时间工作？</h2>
      <div className="input-work-time-container">
        <div>
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 }/>
          <p>周一至周五</p>
        </div>
        <div>
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 }/>
          <p>周六</p>
        </div>
        <div>
          <img src="./images/calendar-workday.png" height={ 50 } width={ 50 }/>
          <p>周日</p>
        </div>
      </div>
    </div>
  )
}

export { InputWorkTime as view }
