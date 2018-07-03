import axios from 'axios'
import { baseUrl } from '../config'

export const getMessageListByParam = params => axios(`${baseUrl}/msg/listMsgByParam`, params)
