import axios from '../config'

export const getIMMsg = params => axios('/imMsg/listMsgByParam', {params})

export const getIMMsgById = params => axios('/imMsg/insertMsg', {params})

// export const insertMsg = data => axios.post('/imMsg/updateMsg', qs.stringify(data))
export const insertMsg = params => axios('/imMsg/updateMsg', {params})