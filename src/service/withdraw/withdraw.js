import axios from '../config'

export const withdraw = params => axios('/withdraw/create', {params})

export const getWxQR = () => axios('/wx/getOpenId')

export const getVerifyStatus = () => axios('/wx/getVerifyStatus')