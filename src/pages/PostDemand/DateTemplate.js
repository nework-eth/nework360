import React from 'react'

// import { DayPickerRangeController } from 'react-dates'

function DateTemplate ({ title }) {
  return (
    <div className="template-content">
      <h2>{ title }</h2>
      <div className="form-item-wrapper">
        { /*<DayPickerRangeController*/ }
        { /*numberOfMonths={ 1 }*/ }
        { /*hideKeyboardShortcutsPanel*/ }
        { /*monthFormat="YYYY[年]M[月]"*/ }
        { /*disabled*/ }
        { /*/>*/ }
      </div>
    </div>)
}

export { DateTemplate as view }
