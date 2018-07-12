import qs from 'qs'
import axios from '../config'

export const getPayInfo = params => axios('/pay/orderNeed', {params})

export const getPayResult = params => axios.post(`/pay/orderStatus?${qs.stringify(params)}`)

