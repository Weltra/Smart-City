// 导入request
import request from './request'

export const getCityBuildings = () => {
  return request({
    url: '/json/Hangzhou_Buildings.json',
    method: 'GET',
  })
}

export const getRoads = () => {
  return request({
    url: '/json/Hangzhou_roads.json',
    method: 'GET',
  })
}

export const getEvents = () => {
  return request({
    url: '/json/Hangzhou_events.json',
    method: 'GET',
  })
}

export const getCsv = () => {
  return request({
    url: '/csv/locs.csv',
    method: 'GET',
  })
}
