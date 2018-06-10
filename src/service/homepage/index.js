import axios from 'axios'
import { baseUrl } from '../config'

export const getCityByLetter = params => axios(`${baseUrl}/district/listCityByCountry`, { params })

export const getCityBySearch = params => axios(`${baseUrl}/district/listDistrictByParam`, { params })

export const getCityByIp = () => axios(`${baseUrl}/district/getDistByIp`)

export const getCityTree = () => axios(`${baseUrl}/district/listDistsByTree`)

export const getServiceTree = params => axios(`${baseUrl}/service/listServiceByCity`, { params })

export const getListServiceByParam = params => axios(`${baseUrl}/service/listServiceByParam`, { params })

export const getHotCity = () => axios(`${baseUrl}/skill/getHotCity`)

export const getListServiceByDist = params => axios(`${baseUrl}/service/listServiceByDist`, { params })
