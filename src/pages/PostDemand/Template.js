import React from 'react'
import { view as CheckboxTemplate } from './CheckboxTemplate'
import { view as DateTemplate } from './DateTemplate'
import { view as LocationTemplate } from './LocationTemplate'
import { view as TextAreaTemplate } from './TextAreaTemplate'

function Template ({
                     id,
                     type,
                     title,
                     value,
                     options,
                     handleChange,
                     isMultiChoice,
                     locationOptions,
                     handleLocationChange,
                     handleSpecAddressChange,
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
      return (
        <CheckboxTemplate
          title={ title }
          value={ value }
          options={ options }
          handleChange={ handleChange }
          isMultiChoice={ isMultiChoice }
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
          handleChange={ handleChange }
        />
      )
    default:
      return null
  }
}

export { Template as view }
