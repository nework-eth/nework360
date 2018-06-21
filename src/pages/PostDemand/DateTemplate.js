import React from 'react'
import { DayPickerSingleDateController } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

function DateTemplate ({
                         title,
                         value,
                         isMultiChoice,
                         handleChange,
                       }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      { isMultiChoice && <p className="multi-tip">可选择多项</p> }
      <div className="form-item-wrapper">
        <DayPickerSingleDateController
          numberOfMonths={ 1 }
          hideKeyboardShortcutsPanel
          monthFormat="YYYY[年]M[月]"
          onDateChange={ handleChange }
          date={ value }
        />
      </div>
    </div>)
}

export { DateTemplate as view }
