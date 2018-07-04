import axios from '../config'

export const getCityByLetter = params => axios('/district/listCityByCountry', {params})

export const getCityBySearch = params => axios('/district/listDistrictByParam', {params})

export const getCityByIp = () => axios('/district/getDistByIp')

export const getCityTree = () => axios('/district/listDistsByTree')

export const getServiceTree = params => axios('/service/listServiceByCity', {params})

export const getListServiceByParam = params => axios('/service/listServiceByParam', {params})

export const getHotCity = () => axios('/skill/getHotCity')

export const getListServiceByDist = params => axios('/service/listServiceByDist', {params})

export const getDistByParam = params => axios('/district/listDistrictByParam', {params})
