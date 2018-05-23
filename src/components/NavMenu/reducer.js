import { SETCITY } from './actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SETCITY:
      return action.city
    default:
      return state
  }
}

