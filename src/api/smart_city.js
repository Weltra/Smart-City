// 导入request
import request from './request'

export const userRegister = () => {
  return request({
    url: '/register/',
    method: 'POST',
  })
}

export const getUsers = () => {
  return request({
    url: '/users/',
    method: 'GET',
  })
}

export const getEvents = () => {
  return request({
    url: '/wuhan_events',
    method: 'GET',
  })
}
