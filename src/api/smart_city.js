// 导入request
import request from './request'

export const getCityBuildings = () => {
  return request({
    url: '/wuhan_buildings',
    method: 'GET',
  })
}

export const getRoads = () => {
  return request({
    url: '/wuhan_roads',
    method: 'GET',
  })
}

export const getEvents = () => {
  return request({
    url: '/wuhan_events',
    method: 'GET',
  })
}
