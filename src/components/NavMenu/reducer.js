import { SETCITYID, SETCITYNAME, SETCOUNTRYID, SETUSER, SETUSERID } from './actionTypes'

const positionReducer = (state = {}, action) => {
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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SETUSERID:
      return { ...state, ...{ userId: action.userId } }
    case SETUSER:
      return action.user
    default:
      return state
  }
}

export { positionReducer, userReducer }


