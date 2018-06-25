import axios from 'axios'
import { baseUrl } from '../config'

export const getNearbySKill = params => axios(`${baseUrl}/skill/getSkillByRange`, { params })

