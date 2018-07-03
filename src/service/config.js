import { message } from 'antd'
import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.response.use(res => {
  const { data: { code, desc } } = res
  if (code !== 200) {
    message.error(desc)
  }
  return res
}, err => {
  console.log(err)
  message.error('网络连接失败，请检查网络后重试')
})

export const baseUrl = 'http://nework-web.rdc.waibaodashi.com'
