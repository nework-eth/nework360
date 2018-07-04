import axios from '../config'

export const getUserAccount = () => axios('/user/account')

export const getUserTransactionRecord = () => axios('/user/orderRecord')
