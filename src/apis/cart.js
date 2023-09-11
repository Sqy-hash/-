import request from '@/utils/http'

//加入购物车
export const inserCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}
// 获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart',
    method: 'GET'
  }) 
}
// 删除购物车
export const DelCartAPI = (ids) => { 
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
//合并购物车
export const mergeCartAPI = (data) => { 
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}