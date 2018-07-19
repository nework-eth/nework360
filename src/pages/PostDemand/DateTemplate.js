import { Button } from 'antd'
import moment from 'moment'
import React from 'react'
import { DayPickerSingleDateController } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

function DateTemplate ({
                         title,
                         value,
                         addMoreDay,
                         isMultiChoice,
                         handleDateChange,
                       }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      { isMultiChoice && <p className="multi-tip">多次添加</p> }
      { value.map((valueItem, index) => <div className="form-item-wrapper" key={ index }>
        <DayPickerSingleDateController
          numberOfMonths={ 1 }
          hideKeyboardShortcutsPanel
          monthFormat="YYYY[年]M[月]"
          onDateChange={ (value) => {handleDateChange(value, index)} }
          enableOutsideDays
          isDayBlocked={ (value) => !moment().isBefore(value) }
          date={ valueItem }
        />
      </div>) }
      <div className="button-wrapper">
        <Button type="primary" onClick={ addMoreDay }>再选一天</Button>
      </div>
    </div>)
}

export { DateTemplate as view }
