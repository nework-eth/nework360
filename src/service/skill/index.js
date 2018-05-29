import axios from 'axios'
import { baseUrl } from '../config'

export const releaseSkill = data => axios.post(`${baseUrl}/skill/postSkill`, data)
