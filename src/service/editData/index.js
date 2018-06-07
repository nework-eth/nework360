import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const getUserById = params => axios(`${baseUrl}/user/getUserById`, { params })

export const changePwd = data => axios.post(`${baseUrl}/user/updatePwd`, qs.stringify(data))

export const updateUser = data => axios.post(`${baseUrl}/user/updateUser`, qs.stringify(data))

export const getMessageCode = data => axios.post(`${baseUrl}/bind/sendPhoneCode`, qs.stringify(data))

export const verifyPhoneNumber = data => axios.post(`${baseUrl}/bind/verifyPhoneCode`, qs.stringify(data))