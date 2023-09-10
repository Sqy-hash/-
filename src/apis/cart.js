import request from '@/utils/http.js'

//加入购物车
export const inserCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    methos: 'POST',
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