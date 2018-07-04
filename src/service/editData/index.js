import qs from 'qs'
import axios from '../config'

export const getUserById = params => axios('/user/getUserById', {params})

export const changePwd = data => axios.post('/user/updatePwd', qs.stringify(data))

export const updateUser = data => axios.post('/user/updateUser', qs.stringify(data))

export const getPhoneCode = data => axios.post('/bind/sendPhoneCode', qs.stringify(data))

export const verifyPhoneNumber = data => axios.post('/bind/verifyPhoneCode', qs.stringify(data))

export const getMailCode = data => axios.post('/bind/sendMailCode', qs.stringify(data))

export const verifyEmail = data => axios.post('/bind/verifyEmailCode', qs.stringify(data))

export const getSkillByUserId = params => axios('/skill/getSkillByUserId', {params})

export const deleteSkill = params => axios('/skill/deleteSkill', {params})

export const postSkill = data => axios.post('/skill/postSkill', qs.stringify(data))

export const postSkillTemp = jsonArray => axios.post('/skill/postSkillTemp', qs.stringify({jsonArray}))
