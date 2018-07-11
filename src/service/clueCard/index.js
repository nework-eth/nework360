import axios from '../config'

export const getClueCardPrice = params => axios('/pay/culeMoney', {params})

export const buyClueCard = params => axios('/pay/buyCule', {params})

export const getClueCardPayInfo = params => axios('/pay/culeInfo', {params})

