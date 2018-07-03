import axios from 'axios'
import { baseUrl } from '../config'

export const getUserAccount = () => axios(`${baseUrl}/user/account`)

export const getUserTransactionRecord = () => axios(`${baseUrl}/user/orderRecord`)
