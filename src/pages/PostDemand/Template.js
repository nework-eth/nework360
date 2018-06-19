import React from 'react'
import { view as CheckboxTemplate } from './CheckboxTemplate'
import { view as DateTemplate } from './DateTemplate'
import { view as InputTemplate } from './InputTemplate'
import { view as LocationTemplate } from './LocationTemplate'

function Template ({
                     id,
                     type,
                     title,
                     options,
                     isNecessary,
                     isMultiChoice,
                   }) {
  switch (type) {
    case 'input':
      return (
        <InputTemplate
          title={ title }
        />
      )
    case 'select':
      return (
        <CheckboxTemplate
          title={ title }
          options={ options }
        />
      )
    case 'location':
      return (
        <LocationTemplate
          title={ title }
        />
      )
    case 'time':
      return (
        <DateTemplate
          title={ title }
        />
      )
    default:
      return null
  }
}

export { Template as view }
