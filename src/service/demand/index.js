import qs from 'qs'
import axios from '../config'

export const getTemplate = params => axios('/postDemand/getTemplate', {params})

export const createDemand = (data, param) => axios.post(`/postDemand/createNeeds?${qs.stringify(param)}`, data)

export const getMatchResult = params => axios('/skill/getSkillByScore', {params})