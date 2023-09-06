import httpInstance from '@/utils/http.js'
export function getNewAPI () { 
  return httpInstance({
    url:'/home/new'
  })
}
