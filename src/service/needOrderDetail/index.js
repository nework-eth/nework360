import axios from '../config'

export const getNeedOrderDetail = params => axios('/postDemand/getOrderNeedsInfo', {params})

export const selectPartyB = params => axios('/postDemand/choose', {params})

export const cancelOrder = params => axios('/postDemand/cancel', {params})

export const getPayInfo = params => axios('/pay/orderNeed', {params})

export const getUserOnlineStatus = params => axios('/user/getUserOnlineStatus', {params})
