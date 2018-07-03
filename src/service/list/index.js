import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const getNeedOrderList = params => axios(`${baseUrl}/postDemand/getOrderNeedsList`, {params})

export const getServiceOrderList = params => axios(`${baseUrl}/tenderDemand/getQuotes`, {params})

export const cancelServiceOrder = params => axios(`${baseUrl}/tenderDemand/cancel`, {params})

export const deleteServiceOrder = params => axios(`${baseUrl}/tenderDemand/deleteQuote`, {params})

export const withdrawServiceOrder = params => axios(`${baseUrl}/tenderDemand/withdrawQuote`, {params})

export const initiatePayment = params => axios(`${baseUrl}/tenderDemand/withdrawQuote`, {params})

export const evaluate = data => axios.post(`${baseUrl}/evaluate/create`, qs.stringify(data))