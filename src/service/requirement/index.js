import axios from '../config'

export const getNearbySKill = params => axios('/skill/getSkillByRange', {params})

