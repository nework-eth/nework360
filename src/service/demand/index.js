import axios from 'axios'
import { baseUrl } from '../config'

export const getTemplate = params => axios(`${baseUrl}/postDemand/getTemplate`, { params })

