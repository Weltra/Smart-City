// 导入request
import request from './request'

export const getCityBuildings = () => {
  return request({
    url: '/hangzhou_buildings',
    method: 'GET',
  })
}

export const getRoads = () => {
  return request({
    url: '/hangzhou_roads',
    method: 'GET',
  })
}

export const getEvents = () => {
  return request({
    url: '/hangzhou_events',
    method: 'GET',
  })
}

export const getCsv = () => {
  return request({
    url: '/csv/locs.csv',
    method: 'GET',
  })
}
