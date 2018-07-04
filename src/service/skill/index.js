import qs from 'qs'
import axios from '../config'

export const releaseSkill = data => axios.post('/skill/postSkill', qs.stringify(data))

export const getServiceList = params => axios('/service/listServiceByParam', {params})
