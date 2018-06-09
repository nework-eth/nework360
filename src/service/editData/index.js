import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config'

export const getUserById = params => axios(`${baseUrl}/user/getUserById`, { params })

export const changePwd = data => axios.post(`${baseUrl}/user/updatePwd`, qs.stringify(data))

export const updateUser = data => axios.post(`${baseUrl}/user/updateUser`, qs.stringify(data))

export const getPhoneCode = data => axios.post(`${baseUrl}/bind/sendPhoneCode`, qs.stringify(data))

export const verifyPhoneNumber = data => axios.post(`${baseUrl}/bind/verifyPhoneCode`, qs.stringify(data))

export const getMailCode = data => axios.post(`${baseUrl}/bind/sendMailCode`, qs.stringify(data))

export const verifyEmail = data => axios.post(`${baseUrl}/bind/verifyEmailCode`, qs.stringify(data))

export const getSkillByUserId = params => axios(`${baseUrl}/skill/getSkillByUserId`, { params })

export const deleteSkill = params => axios(`${baseUrl}/skill/deleteSkill`, { params })

export const postSkill = data => axios.post(`${baseUrl}/skill/postSkill`, qs.stringify(data))
