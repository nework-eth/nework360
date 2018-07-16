import axios from '../config'

export const withdraw = params => axios('/withdraw/create', {params})

