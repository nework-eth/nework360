import qs from 'qs'
import axios from '../config'

export const sendCode = data => axios.post(`/login/signUp/sendCode`, qs.stringify(data))

export const register = data => axios.post(`/login/signUp`, qs.stringify(data))

export const login = data => axios.post(`/login/signIn`, qs.stringify(data))

export const forgetPasswordSendCode = data => axios.post(`/login/forgot/sendCode`, qs.stringify(data))

export const changePassword = data => axios.post(`/login/forgot`, qs.stringify(data))

export const signOut = () => axios(`/login/signOut`)
