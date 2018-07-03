import axios from 'axios'
import { baseUrl } from '../config'

export const getMessage = params => axios(`${baseUrl}/msg/listMsgByParam`, {params})

export const updateMessageStatus = params => axios(`${baseUrl}/msg/updateMsg`, {params})
