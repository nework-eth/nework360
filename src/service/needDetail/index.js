import axios from 'axios'
import { baseUrl } from '../config'

export const getNeedDetail = params => axios(`${baseUrl}/postDemand/getNeedsItemInfo`, {params})

export const createQuote = params => axios.post(`${baseUrl}/tenderDemand/createQuote`)
