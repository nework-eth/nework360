import React from 'react'
import { view as CheckboxTemplate } from './CheckboxTemplate'
import { view as DateTemplate } from './DateTemplate'
import { view as LocationTemplate } from './LocationTemplate'
import { view as RadioTemplate } from './RadioTemplate'
import { view as TextAreaTemplate } from './TextAreaTemplate'

function Template ({
                     id,
                     item,
                     type,
                     title,
                     value,
                     options,
                     addMoreDay,
                     handleChange,
                     focusedInput,
                     onFocusChange,
                     isMultiChoice,
                     locationOptions,
                     handleDateChange,
                     handleRadioChange,
                     handleLocationChange,
                     handleDateRangeChange,
                     handleSpecAddressChange,
                     handleFocusedInputChange,
                   }) {
  switch (type) {
    case 'input':
      return (
        <TextAreaTemplate
          title={ title }
          value={ value }
          handleChange={ handleChange }
        />
      )
    case 'select':
      if (!!isMultiChoice) {
        return (
          <CheckboxTemplate
            title={ title }
            value={ value }
            options={ options }
            handleChange={ handleChange }
            isMultiChoice={ isMultiChoice }
          />
        )
      }
      return (
        <RadioTemplate
          title={ title }
          value={ value }
          options={ options }
          handleChange={ handleRadioChange }
        />
      )
    case 'location':
      return (
        <LocationTemplate
          title={ title }
          value={ value }
          locationOptions={ locationOptions }
          handleLocationChange={ handleLocationChange }
          handleSpecAddressChange={ handleSpecAddressChange }
        />
      )
    case 'time':
      return (
        <DateTemplate
          title={ title }
          value={ value }
          addMoreDay={ addMoreDay }
          focusedInput={ focusedInput }
          handleDateChange={ handleDateChange }
          handleDateRangeChange={ handleDateRangeChange }
          handleFocusedInputChange={ handleFocusedInputChange }
        />
      )
    default:
      return null
  }
}

export { Template as view }
