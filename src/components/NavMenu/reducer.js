import { SETCITYNAME, SETCITYID, SETCOUNTRYID } from './actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SETCITYNAME:
      return { ...state, ...{ cityName: action.cityName } }
    case SETCITYID:
      return { ...state, ...{ cityId: action.cityId } }
    case SETCOUNTRYID:
      return { ...state, ...{ countryId: action.countryId } }
    default:
      return state
  }
}

