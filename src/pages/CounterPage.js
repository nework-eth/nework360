import React from 'react'
import { reducer, stateKey, view as Counter } from '../components/Counter'

const page = () => {
  return (
    <div>
      <div>Counter</div>
      <Counter/>
    </div>
  )
}

const initialState = 100

export { page, reducer, initialState, stateKey }
