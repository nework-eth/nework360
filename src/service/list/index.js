import axios from 'axios'
import { baseUrl } from '../config'

export const getNeedOrderList = params => axios(`${baseUrl}/postDemand/getOrderNeedsList`, { params })
