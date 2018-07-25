import { message } from 'antd'
import axios from 'axios'
import { browserHistory } from 'react-router'
import * as ActionTypes from './components/NavMenu/actionTypes'
import store from './Store'

axios.defaults.baseURL = 'http://nework-web.rdc.waibaodashi.com'

axios.defaults.withCredentials = true

axios.interceptors.response.use(res => {
  const {data: {code, desc}} = res
  if (code === 501) {
    browserHistory.push('/login')
    store.dispatch({type: ActionTypes.SETUSER, user: {}})
    store.dispatch({type: ActionTypes.SETUSERID, userId: undefined})
    return res
  }
  if (code !== 200 && code !== 302) {
    message.error(desc)
  }
  return res
}, err => {
  console.log(err)
  message.error('网络连接失败，请检查网络后重试')
})

export const baseUrl = 'http://nework-web.rdc.waibaodashi.com'

export default axios
