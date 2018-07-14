import qs from 'qs'
import axios from '../config'

export const getNeedOrderList = params => axios('/postDemand/getOrderNeedsList', {params})

export const getServiceOrderList = params => axios('/tenderDemand/getQuotes', {params})

export const cancelServiceOrder = params => axios('/tenderDemand/cancel', {params})

export const deleteServiceOrder = params => axios('/tenderDemand/deleteQuote', {params})

export const withdrawServiceOrder = params => axios('/tenderDemand/withdrawQuote', {params})

export const initiatePayment = params => axios('/tenderDemand/collect', {params})

export const evaluate = data => axios.post('/evaluate/create', qs.stringify(data))