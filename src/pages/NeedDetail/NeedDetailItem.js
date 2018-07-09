import React from 'react'

import { classNameSpace } from './NeedDetail'

function NeedDetailItem ({ data }) {
  return (
    <div className={ `${classNameSpace}-item-wrapper` }>
      {
        data.map(({content, resultValue}, index) => {
          if (index % 2) {
            if (Array.isArray(resultValue)) {
              return resultValue.map(item => <p key={ item }>{ item }</p>)
            }
            return <p key={ resultValue }>{ resultValue }</p>
          }
          return <h3 key={ content }>{ content }</h3>
        })
      }
    </div>
  )
}

export { NeedDetailItem as view }