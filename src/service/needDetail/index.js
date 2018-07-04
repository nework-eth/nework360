import qs from 'qs'
import axios from '../config'

export const getNeedDetail = params => axios('/postDemand/getNeedsItemInfo', {params})

export const createQuote = data => axios.post('/tenderDemand/createQuote', qs.stringify(data))
