import { request } from './request'

export function getHomeMutilate() {
  return request({
    url: '/home/multidata'
  })
}