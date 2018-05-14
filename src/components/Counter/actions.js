import * as ActionTypes from './actionTypes.js'

export const increment = () => ({
  type: ActionTypes.INCREMENT,
})

export const asyncIncrement = () => async dispatch => {
  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })
  dispatch(increment())
}

export const decrement = () => ({
  type: ActionTypes.DECREMENT,
})
