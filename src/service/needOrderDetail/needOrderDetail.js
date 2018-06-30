import axios from 'axios'
import { baseUrl } from '../config'

export const getNeedOrderDetail = params => axios(`${baseUrl}/postDemand/getOrderNeedsInfo`, {params})

export const selectPartyB = params => axios(`${baseUrl}/postDemand/choose`, {params})

export const cancelOrder = params => axios(`${baseUrl}/postDemand/cancel`, {params})
