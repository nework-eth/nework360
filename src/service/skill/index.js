import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const releaseSkill = data => axios.post(`${baseUrl}/skill/postSkill`, qs.stringify(data))
