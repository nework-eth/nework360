import axios from '../config'

export const getUserAccount = () => axios('/user/account')

export const getUserTransactionRecord = () => axios('/user/orderRecord')

export const getUserClueCardRecord = params => axios('/cule/getCule', {params})
