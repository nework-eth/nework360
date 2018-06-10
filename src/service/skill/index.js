import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const releaseSkill = data => axios.post(`${baseUrl}/skill/postSkill`, qs.stringify(data))

export const getServiceList = params => axios(`${baseUrl}/service/listServiceByParam`, { params })
