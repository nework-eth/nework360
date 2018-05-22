import axios from 'axios'
import { baseUrl } from '../config'
import qs from 'qs'

export const sendCode = data => axios.post(`${baseUrl}/login/signUp/sendCode`, qs.stringify(data))

export const register = data => axios.post(`${baseUrl}/login/signUp`, data)

export const login = data => axios.post(`${baseUrl}/login/signIn`, data)

export const forgetPasswordSendCode = data => axios.post(`${baseUrl}/login/forgot/sendCode`, data)

export const changePassword = data => axios.post(`${baseUrl}/login/forgot`, data)
