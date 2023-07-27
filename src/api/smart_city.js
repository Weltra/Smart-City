// 导入request
import request from './request'

export const getCityBuildings = () => {
  return request({
    url: '/json/Wuhan_buildings.json',
    method: 'GET',
  })
}

export const getRoads = () => {
  return request({
    url: '/json/Wuhan_roads.json',
    method: 'GET',
  })
}

export const getEvents = () => {
  return request({
    url: '/json/Wuhan_events.json',
    method: 'GET',
  })
}

export const getHangzhouEvent = () => {
  return request({
    url: '/json/hangzhou.json',
    method: 'GET',
  })
}

export const getCsv = () => {
  return request({
    url: '/csv/locs.csv',
    method: 'GET',
  })
}
