import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const getTemplate = params => axios(`${baseUrl}/postDemand/getTemplate`, { params })

export const createDemand = (data, param) => axios.post(`${baseUrl}/postDemand/createNeeds?${qs.stringify(param)}`, data)