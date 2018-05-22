import axios from 'axios'
import { baseUrl } from '../config'

export const getCityByLetter = params => axios(`${baseUrl}/district/listCityByCountry`, { params })

export const getCityBySearch = params => axios(`${baseUrl}/district/listDistrictByParam`, { params })

export const getCityByIp = () => axios(`${baseUrl}/district/getDistByIp`)
