import httpInstance from '@/utils/http.js'
// 获取Banner数据
export function getBannerAPI(params = {}) { 
  // 默认为1  商品为2
  const { distributionSite ='1'} = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

export function getGoodsAPI() { 
  return httpInstance({
    url:'/home/goods'
  })
}