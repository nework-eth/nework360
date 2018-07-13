import qs from 'qs'
import axios from '../config'

export const getIMMsg = params => axios('/imMsg/listMsgByParam', {params})

export const getIMDialog = params => axios('/imMsg/getMsgDialog', {params})

export const insertMsg = data => axios.post('/imMsg/insertMsg', qs.stringify(data))